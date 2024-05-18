package com.todayeat.backend.order.service;

import com.todayeat.backend._common.annotation.DistributedLock;
import com.todayeat.backend._common.notification.dto.CreateOrderNotification;
import com.todayeat.backend._common.notification.service.ConsumerNotificationService;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.FCMNotificationUtil;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.cart.entity.Cart;
import com.todayeat.backend.cart.repository.CartRepository;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.order.api.client.IamportRequestClient;
import com.todayeat.backend.order.api.dto.request.CancelPaymentRequest;
import com.todayeat.backend.order.api.dto.response.GetPaymentResponse;
import com.todayeat.backend.order.dto.request.consumer.ValidateOrderConsumerRequest;
import com.todayeat.backend.order.dto.request.seller.UpdateStatusSellerRequest;
import com.todayeat.backend.order.dto.response.consumer.*;
import com.todayeat.backend.order.dto.response.seller.*;
import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoItem;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import com.todayeat.backend.order.repository.OrderInfoItemRepository;
import com.todayeat.backend.order.repository.OrderInfoRepository;
import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.sale.repository.SaleRepository;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.repository.StoreRepository;
import com.todayeat.backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.todayeat.backend._common.response.error.ErrorType.*;
import static com.todayeat.backend.order.entity.OrderInfoStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderInfoItemRepository orderInfoItemRepository;
    private final OrderInfoRepository orderInfoRepository;
    private final StoreRepository storeRepository;
    private final SaleRepository saleRepository;
    private final CartRepository cartRepository;
    private final ConsumerNotificationService consumerNotificationService;

    private final StoreService storeService;

    private final SecurityUtil securityUtil;
    private final FCMNotificationUtil fcmNotificationUtil;

    private final IamportRequestClient iamportRequestClient;

    @Value("${IAMPORT_API_SECRET_V2}")
    private String IAMPORT_API_SECRET_V2;

    @Value("${IAMPORT_STORE_ID}")
    private String IAMPORT_STORE_ID;

    private String PORTONE_PREFIX = "PortOne ";

    @Transactional
    public CreateOrderResponse create() {

        Consumer consumer = securityUtil.getConsumer();
        Boolean isDonated = consumer.getIsDonated();

        // 장바구니 목록 조회
        List<Cart> carts = cartRepository.findAllByConsumerId(consumer.getId());

        // 장바구니가 없을 경우
        if (carts.isEmpty()) {
            throw new BusinessException(CART_NOT_FOUND);
        }

        // 첫 번째 장바구니 확인
        Store firstStore = storeRepository.findByIdAndDeletedAtIsNull(carts.getFirst().getStoreId())
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND)); // store 유효성 검사
        if (!firstStore.getIsOpened()) { // store 열려 있는지 확인
            throw new BusinessException(STORE_NOT_OPEN);
        }

        int originalPrice = 0;
        int paymentPrice = 0;

        // 장바구니 목록 확인
        for (Cart cart : carts) {

            // 판매
            Sale sale = findSaleOrElseThrow(cart);

            // 수량 유효성 검사 후 판매량 증가
            validateAndUpdateSale(sale, cart.getQuantity());

            // 금액 증가
            originalPrice += cart.getQuantity() * sale.getOriginalPrice();
            if (!isDonated) { // 나눔이 아닐 경우 결제 금액 증가
                paymentPrice += cart.getQuantity() * sale.getSellPrice();
            }
        }

        // 주문 정보 저장
        OrderInfo orderInfo = OrderInfo.of( // 나눔 받지 않는 경우
                UUID.randomUUID().toString(),
                originalPrice,
                originalPrice - paymentPrice, // discountPrice
                paymentPrice,
                consumer,
                firstStore);
        orderInfoRepository.save(orderInfo);

        // 주문 아이템 정보 저장
        carts.iterator().forEachRemaining(
                cart -> orderInfoItemRepository.save(
                        OrderInfoItem.of(findSaleOrElseThrow(cart), cart.getQuantity(), orderInfo, isDonated))
        );

        // 나눔일 경우
        if (isDonated) {

            // 장바구니 삭제
            cartRepository.findAllByConsumerId(consumer.getId())
                    .iterator().forEachRemaining(cartRepository::delete);
        }

        return CreateOrderResponse.of(orderInfo.getId(), paymentPrice, consumer);
    }

    @Transactional
    @DistributedLock(key = "#sale.getId()", prefix = "create_order")
    public Sale validateAndUpdateSale(Sale sale, Integer cartQuantity) {

        Integer stock = sale.getStock() - sale.getTotalQuantity();

        // 실제 남은 수량과 장바구니 수량을 비교
        if (stock.compareTo(cartQuantity) < 0) {
            throw new BusinessException(CART_QUANTITY_MORE_THAN_REST_STOCK);
        }

        // 판매량 증가
        sale.updateTotalQuantity(cartQuantity);

        return sale;
    }

    @Transactional
    @DistributedLock(key = "#orderInfoId", prefix = "validate_order")
    public void validate(Long orderInfoId, ValidateOrderConsumerRequest request) {

        Consumer consumer = securityUtil.getConsumer();

        // 나눔 받는 경우
        if (consumer.getIsDonated()) {
            throw new BusinessException(ORDER_VALIDATE_FORBIDDEN);
        }

        // 주문 확인
        OrderInfo orderInfo = findOrderInfoOrElseThrow(orderInfoId);

        // 권한 검사
        validateOrderInfoAndConsumer(orderInfo, consumer);

        // 결제 완료된 주문일 경우 throw
        if (orderInfo.getStatus() != UNPAID) {
            throw new BusinessException(ORDER_ALREADY_PAID);
        }

        GetPaymentResponse getPaymentResponse;

        // 아임포트 결제 조회
        try {
            getPaymentResponse = iamportRequestClient.getPayment(
                    PORTONE_PREFIX + IAMPORT_API_SECRET_V2,
                    request.getPaymentId(),
                    IAMPORT_STORE_ID);
        } catch (Exception e) {
            throw new BusinessException(ORDER_PAYMENT_FAIL);
        }

        // 결제 완료 상태가 아니거나 주문 금액과 실제 결제 금액이 다를 경우
        if (!getPaymentResponse.getStatus().equals("PAID")
                || !Objects.equals(getPaymentResponse.getAmount().getTotal(), orderInfo.getPaymentPrice())) {

            // 주문 아이템 삭제
            orderInfoItemRepository.deleteAll(
                    orderInfoItemRepository.findAllByOrderInfoIdAndDeletedAtIsNull(orderInfo.getId()));

            // 주문 삭제
            orderInfoRepository.delete(orderInfo);

            // 판매량 감소
            orderInfo.getOrderInfoItemList().stream().iterator().forEachRemaining(
                    item -> {
                        Sale sale = item.getSale();
                        updateSaleQuantity(sale, -item.getQuantity());
                    }
            );

            throw new BusinessException(ORDER_PAYMENT_FAIL);
        }

        // 결제 정보 및 주문 상태 업데이트
        orderInfo.updatePaymentId(request.getPaymentId());
        orderInfo.updateStatus(PAID);

        // 장바구니 삭제
        cartRepository.findAllByConsumerId(consumer.getId())
                .iterator().forEachRemaining(cartRepository::delete);
    }

    @Transactional
    @DistributedLock(key = "#sale.getId()", prefix = "update_sale_quantity")
    public void updateSaleQuantity(Sale sale, Integer quantity) {
        sale.updateTotalQuantity(quantity);
    }

    @Transactional
    public void updateStatusSeller(Long orderInfoId, UpdateStatusSellerRequest request) {

        OrderInfo orderInfo = findOrderInfoOrElseThrow(orderInfoId);
        Seller seller = securityUtil.getSeller();

        // 권한 검사
        validateStoreAndSeller(orderInfo.getStore().getId(), seller);

        // 요청된 주문 상태
        OrderInfoStatus orderInfoStatus;
        try {
            orderInfoStatus =  OrderInfoStatus.valueOf(request.getStatus());
        } catch (Exception e) {
            throw new BusinessException(ORDER_STATUS_BAD_REQUEST);
        }

        // 수락 요청인데 소요 예상 시간이 없는 경우
        if (orderInfoStatus == IN_PROGRESS && request.getTakenTime() == null) {
            throw new BusinessException(ORDER_TAKEN_TIME_NOT_BLANK);
        }

        // 수락 요청이 아닌데 소요 예상 시간이 있는 경우
        if (orderInfoStatus != IN_PROGRESS && request.getTakenTime() != null) {
            throw new BusinessException(ORDER_TAKEN_TIME_BLANK);
        }

        // 결제 완료 상태
        if (orderInfo.getStatus() == PAID) {

            // 수락
            if (orderInfoStatus == IN_PROGRESS) {

                orderInfo.updateStatus(orderInfoStatus);
                orderInfo.updateTakenTimeAndApprovedAt(request.getTakenTime());

                return;
            }

            // 거절
            if (orderInfoStatus == DENIED) {

                // 주문 상태 변경
                orderInfo.updateStatus(orderInfoStatus);

                // 판매량 감소
                orderInfo.getOrderInfoItemList().stream().iterator().forEachRemaining(
                        item -> {
                            Sale sale = item.getSale();
                            updateSaleQuantity(sale, -item.getQuantity());
                        }
                );

                // 결제 취소
                if (orderInfo.getPaymentId() != null) {
                    cancelPayment(orderInfo.getPaymentId());
                }

                return;
            }

            // 나머지 불가능
            throw new BusinessException(ORDER_STATUS_CANT_UPDATE);
        }

        // 진행중(수락) 상태
        if (orderInfo.getStatus() == IN_PROGRESS) {

            // 준비 완료
            if (orderInfoStatus == PREPARED) {

                orderInfo.updateStatus(orderInfoStatus);

                return;
            }

            // 취소
            if (orderInfoStatus == CANCEL) {

                // 주문 상태 변경
                orderInfo.updateStatus(orderInfoStatus);

                // 판매량 감소
                orderInfo.getOrderInfoItemList().stream().iterator().forEachRemaining(
                        item -> {
                            Sale sale = item.getSale();
                            updateSaleQuantity(sale, -item.getQuantity());
                        }
                );

                // 결제 취소
                if (orderInfo.getPaymentId()!= null) {
                    cancelPayment(orderInfo.getPaymentId());
                }

                return;
            }

            // 나머지 불가능
            throw new BusinessException(ORDER_STATUS_CANT_UPDATE);
        }

        // 준비 완료 상태
        if (orderInfo.getStatus() == PREPARED) {

            // 수령 완료
            if (orderInfoStatus == FINISHED) {

                orderInfo.updateStatus(orderInfoStatus);

                int value = orderInfoItemRepository.findAllByOrderInfoIdAndDeletedAtIsNull(orderInfoId).stream()
                        .mapToInt(OrderInfoItem::getQuantity)
                        .sum();

                orderInfo.getConsumer().updateOrderCnt(value);

                storeService.updateSaleCnt(
                        storeRepository.findByIdAndDeletedAtIsNull(seller.getStore().getId())
                                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND)),
                        value);

                // 소비자 음식 수령 알림
                CreateOrderNotification createOrderNotification = CreateOrderNotification.of(
                        orderInfo,
                        orderInfo.getOrderInfoItemList().get(0).getName(),
                        orderInfo.getOrderInfoItemList().size());

                consumerNotificationService.createOrderNotification(createOrderNotification, orderInfo.getConsumer());

                fcmNotificationUtil.sendToOne(orderInfo.getConsumer().getId(), "Consumer",
                        createOrderNotification.getTitle(), createOrderNotification.getBody());

                return;
            }
        }

        // 상태 수정 불가능한 상태
        throw new BusinessException(ORDER_STATUS_CANT_UPDATE);
    }

    @Transactional
    public void updateStatusConsumer(Long orderInfoId) {

        OrderInfo orderInfo = findOrderInfoOrElseThrow(orderInfoId);

        // 권한 검사
        validateOrderInfoAndConsumer(orderInfo, securityUtil.getConsumer());

        // 상태 수정 불가능한 상태
        if (orderInfo.getStatus() != UNPAID && orderInfo.getStatus() != PAID) {
            throw new BusinessException(ORDER_STATUS_CANT_UPDATE);
        }

        // 주문 상태 변경
        orderInfo.updateStatus(CANCEL);

        // 판매량 감소
        orderInfo.getOrderInfoItemList().stream().iterator().forEachRemaining(
                item -> {
                    Sale sale = item.getSale();
                    updateSaleQuantity(sale, -item.getQuantity());
                }
        );

        // 결제 취소
        if (orderInfo.getPaymentId() != null) {
            cancelPayment(orderInfo.getPaymentId());
        }
    }

    public GetOrderListConsumerResponse getListConsumer(Integer page, Integer size, String keyword) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Consumer consumer = securityUtil.getConsumer();

        // 검색어 없는 경우
        if (keyword == null || keyword.isEmpty()) {

            Slice<OrderInfo> orderInfos = orderInfoRepository.findAllByConsumerIdAndStatusIsNotUnpaidAndDeletedAtIsNull(consumer.getId(), pageable);

            return GetOrderListConsumerResponse.of(
                    orderInfos.getContent().stream().map(GetOrderConsumerResponse::from).collect(Collectors.toList()),
                    orderInfos.getNumber(),
                    orderInfos.hasNext());
        }

        // 검색어 있는 경우
        Slice<OrderInfo> orderInfos = orderInfoRepository.findAllByConsumerIdAndStatusIsNotUnpaidAndKeywordDeletedAtIsNull(consumer.getId(), keyword, pageable);

        return GetOrderListConsumerResponse.of(
                orderInfos.getContent().stream().map(GetOrderConsumerResponse::from).collect(Collectors.toList()),
                orderInfos.getNumber(),
                orderInfos.hasNext());
    }

    public GetOrderListInProgressSellerResponse getInProgressListSeller(Long storeId, Integer page, Integer size) {

        validateStoreAndSeller(storeId, securityUtil.getSeller());

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending()); // 페이징
        List<OrderInfoStatus> statusList = Arrays.asList(PAID, IN_PROGRESS, PREPARED); // 진행중인 상태

        Slice<OrderInfo> orderInfos = orderInfoRepository.findAllByStoreIdAndStatusAndDeletedAtIsNull(storeId, statusList, pageable);

        return GetOrderListInProgressSellerResponse.of(
                orderInfos.stream().map(GetOrderInProgressSellerResponse::from).collect(Collectors.toList()),
                orderInfos.getNumber(),
                orderInfos.hasNext());
    }

    public GetOrderListFinishedSellerResponse getFinishedListSeller(Long storeId, Integer page, Integer size, String orderNo) {

        validateStoreAndSeller(storeId, securityUtil.getSeller());

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending()); // 페이징
        List<OrderInfoStatus> statusList = Arrays.asList(CANCEL, DENIED, FINISHED); // 종료된 상태

        // 주문번호 검색 없는 경우
        if (orderNo == null || orderNo.isEmpty()) {
            Slice<OrderInfo> orderInfos = orderInfoRepository.findAllByStoreIdAndStatusAndDeletedAtIsNull(storeId, statusList, pageable);

            return GetOrderListFinishedSellerResponse.of(
                    orderInfos.stream().map(GetOrderFinishedSellerResponse::from).collect(Collectors.toList()),
                    orderInfos.getNumber(),
                    orderInfos.hasNext());
        }

        // 주문번호 검색 있는 경우
        Slice<OrderInfo> orderInfos = orderInfoRepository.findAllByStoreIdAndStatusAndOrderNoAndDeletedAtIsNull(storeId, statusList, orderNo, pageable);

        return GetOrderListFinishedSellerResponse.of(
                orderInfos.stream().map(GetOrderFinishedSellerResponse::from).collect(Collectors.toList()),
                orderInfos.getNumber(),
                orderInfos.hasNext());
    }

    public GetOrderDetailConsumerResponse getOrderDetailConsumer(Long orderInfoId) {

        // 주문
        OrderInfo orderInfo = findOrderInfoOrElseThrow(orderInfoId);

        // 권한 검사
        validateOrderInfoAndConsumer(orderInfo, securityUtil.getConsumer());

        // 반환
        return GetOrderDetailConsumerResponse.from(orderInfo);
    }

    public GetOrderDetailSellerResponse getOrderDetailSeller(Long orderInfoId) {

        // 주문
        OrderInfo orderInfo = findOrderInfoOrElseThrow(orderInfoId);

        // 권한 검사
        validateStoreAndSeller(orderInfo.getStore().getId(), securityUtil.getSeller());

        // 반환
        return GetOrderDetailSellerResponse.from(orderInfo);
    }

    public GetOrderInProgressConsumerResponse getOrderInProgressConsumer(Long orderInfoId) {

        // 주문
        OrderInfo orderInfo = findOrderInfoOrElseThrow(orderInfoId);

        // 권한 검사
        validateOrderInfoAndConsumer(orderInfo, securityUtil.getConsumer());

        // 상태
        OrderInfoStatus status = orderInfo.getStatus();

        // 진행 중 여부 확인
        if (status != PAID && status != IN_PROGRESS && status != PREPARED) {
            throw new BusinessException(ORDER_NOT_IN_PROGRESS);
        }

        // 반환
        return GetOrderInProgressConsumerResponse.from(orderInfo);
    }

    private Sale findSaleOrElseThrow(Cart cart) {

        return saleRepository.findByIdAndIsFinishedIsFalseAndDeletedAtIsNull(cart.getSaleId())
                .orElseThrow(() -> new BusinessException(SALE_NOT_SELLING));
    }

    private OrderInfo findOrderInfoOrElseThrow(Long orderInfoId) {

        return orderInfoRepository.findByIdAndDeletedAtIsNull(orderInfoId)
                .orElseThrow(() -> new BusinessException(ORDER_NOT_FOUND));
    }

    private void cancelPayment(String paymentId) {

        try {
            iamportRequestClient.cancelPayment(
                    PORTONE_PREFIX + IAMPORT_API_SECRET_V2,
                    paymentId,
                    CancelPaymentRequest.of("invalid value"));
        } catch (Exception e) {
            log.error("[OrderService.cancelPayment] paymentId {} error : {}", paymentId, e.getMessage());
        }
    }

    private void validateOrderInfoAndConsumer(OrderInfo orderInfo, Consumer consumer) {

        if (!orderInfo.getConsumer().getId().equals(consumer.getId())) {
            throw new BusinessException(ORDER_FORBIDDEN);
        }
    }

    private void validateStoreAndSeller(Long storeId, Seller seller) {

        if (!seller.getStore().getId().equals(storeId)) {
            throw new BusinessException(STORE_FORBIDDEN);
        }
    }
}