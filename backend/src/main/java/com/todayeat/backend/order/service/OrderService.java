package com.todayeat.backend.order.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.cart.entity.Cart;
import com.todayeat.backend.cart.repository.CartRepository;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.order.api.dto.request.CancelPaymentRequest;
import com.todayeat.backend.order.api.dto.response.GetPaymentResponse;
import com.todayeat.backend.order.api.client.IamportRequestClient;
import com.todayeat.backend.order.dto.request.seller.UpdateStatusSellerRequest;
import com.todayeat.backend.order.dto.request.consumer.ValidateOrderConsumerRequest;
import com.todayeat.backend.order.dto.response.consumer.*;
import com.todayeat.backend.order.dto.response.seller.GetOrderFinishedSellerResponse;
import com.todayeat.backend.order.dto.response.seller.GetOrderInProgressSellerResponse;
import com.todayeat.backend.order.dto.response.seller.GetOrderListFinishedSellerResponse;
import com.todayeat.backend.order.dto.response.seller.GetOrderListInProgressSellerResponse;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private final OrderInfoRepository orderInfoRepository;
    private final OrderInfoItemRepository orderInfoItemRepository;
    private final CartRepository cartRepository;
    private final StoreRepository storeRepository;
    private final SaleRepository saleRepository;

    private final SecurityUtil securityUtil;

    private final IamportRequestClient iamportRequestClient;

    @Value("${IAMPORT_API_SECRET_V2}")
    private String IAMPORT_API_SECRET_V2;

    @Value("${IAMPORT_STORE_ID}")
    private String IAMPORT_STORE_ID;

    private String PORTONE_PREFIX = "PortOne ";

    @Transactional
    public CreateOrderResponse create() {

        Consumer consumer = securityUtil.getConsumer();

        // 장바구니 목록 조회
        List<Cart> carts = cartRepository.findAllByConsumerId(consumer.getId());

        // 장바구니가 없을 경우
        if (carts.isEmpty()) {
            throw new BusinessException(CART_NOT_FOUND);
        }

        // 첫 번째 장바구니 확인
        Store firstStore = findStoreOrElseThrow(carts.get(0).getStoreId()); // store 유효성 검사
        if (!firstStore.getIsOpened()) { // store 열려 있는지 확인
            throw new BusinessException(STORE_NOT_OPEN);
        }

        int originalPrice = 0;
        int paymentPrice = 0;

        // 장바구니 목록 확인
        for (Cart cart: carts) {

            Sale sale = findSaleOrElseThrow(cart);

            // 수량 유효성 검사
            validateQuantity(sale, cart);

            // 금액 증가
            originalPrice += cart.getQuantity() * sale.getOriginalPrice();
            paymentPrice += cart.getQuantity() * sale.getSellPrice();
        }

        // 주문 정보 저장
        OrderInfo orderInfo = OrderInfo.of(UUID.randomUUID().toString(),
                                            originalPrice,
                                            originalPrice - paymentPrice, // discountPrice
                                            paymentPrice,
                                            consumer,
                                            firstStore);
        orderInfoRepository.save(orderInfo);

        // 주문 아이템 정보 저장
        carts.iterator().forEachRemaining(
            cart -> orderInfoItemRepository.save(
                        OrderInfoItem.of(findSaleOrElseThrow(cart), cart.getQuantity(), orderInfo))
        );

        return CreateOrderResponse.of(orderInfo.getId());
    }

    @Transactional
    public void validate(Long orderInfoId, ValidateOrderConsumerRequest request) {

        Consumer consumer = securityUtil.getConsumer();

        // 주문 확인
        OrderInfo orderInfo = findOrderInfoOrElseThrow(orderInfoId);

        // 권한 검사
        validateOrderInfoAndConsumer(orderInfo, consumer);

        // 결제 완료된 주문일 경우 throw
        if (orderInfo.getStatus() != UNPAID) {
            throw new BusinessException(ORDER_ALREADY_PAID);
        }

        // TODO: 통신 에러 처리하기

        // 아임포트 결제 조회
        GetPaymentResponse getPaymentResponse =
                iamportRequestClient.getPayment(PORTONE_PREFIX + IAMPORT_API_SECRET_V2,
                                                request.getPaymentId(),
                                                IAMPORT_STORE_ID);

        // 결제 완료 상태가 아니거나 주문 금액과 실제 결제 금액이 다를 경우
        if (!getPaymentResponse.getStatus().equals("PAID")
                || !Objects.equals(getPaymentResponse.getAmount().getTotal(), orderInfo.getPaymentPrice())) {

            // 아임 포트 결제 취소
            cancelPayment(request.getPaymentId());

            // 주문 아이템 삭제
            orderInfoItemRepository.deleteAll(
                    orderInfoItemRepository.findAllByOrderInfoIdAndDeletedAtIsNull(orderInfoId));

            // 주문 삭제
            orderInfoRepository.delete(orderInfo);

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
    public void updateStatusSeller(Long orderInfoId, UpdateStatusSellerRequest request) {

        OrderInfo orderInfo = findOrderInfoOrElseThrow(orderInfoId);
        Seller seller = securityUtil.getSeller();

        // 가게의 판매자가 아닐 경우
        if (orderInfo.getStore().equals(seller.getStore())) {
            throw new BusinessException(STORE_FORBIDDEN);
        }

        OrderInfoStatus orderInfoStatus = getOrderInfoStatusOrThrow(request.getStatus());

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
                orderInfo.updateStatus(orderInfoStatus);
                cancelPayment(orderInfo.getPaymentId());
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
                orderInfo.updateStatus(orderInfoStatus);
                cancelPayment(orderInfo.getPaymentId());
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

        // 주문 상태 변경 및 결제 취소
        orderInfo.updateStatus(CANCEL);
        cancelPayment(orderInfo.getPaymentId());
    }

    public GetOrderListConsumerResponse getListConsumer() {

        Consumer consumer = securityUtil.getConsumer();

        return GetOrderListConsumerResponse.of(
                orderInfoRepository.findAllByConsumerIdAndDeletedAtIsNullOrderByCreatedAtDesc(consumer.getId())
                .stream().map(GetOrderConsumerResponse::from).collect(Collectors.toList()));
    }

    public GetOrderListInProgressSellerResponse getInProgressListSeller(Long storeId) {

        validateStoreAndSeller(storeId, securityUtil.getSeller());

        // 종료되지 않은 주문 목록
        return GetOrderListInProgressSellerResponse.of(
                orderInfoRepository.findAllByStoreIdAndStatusIsNotFinishedAndDeletedAtIsNullOrderByCreatedAtDesc(storeId)
                        .stream().map(GetOrderInProgressSellerResponse::from).collect(Collectors.toList()));
    }

    public GetOrderListFinishedSellerResponse getFinishedListSeller(Long storeId) {

        validateStoreAndSeller(storeId, securityUtil.getSeller());

        // 종료된 주문 목록
        return GetOrderListFinishedSellerResponse.of(
                orderInfoRepository.findAllByStoreIdAndStatusIsFinishedAndDeletedAtIsNullOrderByCreatedAtDesc(storeId)
                        .stream().map(GetOrderFinishedSellerResponse::from).collect(Collectors.toList()));
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

    private Sale findSaleOrElseThrow(Cart cart) {

        return saleRepository.findByIdAndIsFinishedIsFalseAndDeletedAtIsNull(cart.getSaleId())
                .orElseThrow(() -> new BusinessException(SALE_NOT_SELLING));
    }

    private Store findStoreOrElseThrow(Long storeId) {

        return storeRepository.findByIdAndDeletedAtIsNull(storeId)
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));
    }

    private OrderInfo findOrderInfoOrElseThrow(Long orderInfoId) {

        return orderInfoRepository.findByIdAndDeletedAtIsNull(orderInfoId)
                .orElseThrow(() -> new BusinessException(ORDER_NOT_FOUND));
    }

    private void validateQuantity(Sale sale, Cart cart) {

        Integer stock = sale.getStock() - sale.getTotalQuantity();

        // 실제 남은 수량과 장바구니 수량을 비교
        if (stock.compareTo(cart.getQuantity()) < 0) {
            throw new BusinessException(CART_QUANTITY_MORE_THAN_REST_STOCK);
        }
    }

    private OrderInfoStatus getOrderInfoStatusOrThrow(String status) {

        try {
            return OrderInfoStatus.valueOf(status);
        } catch (Exception e) {
            throw new BusinessException(ORDER_STATUS_BAD_REQUEST);
        }
    }

    private void cancelPayment(String paymentId) {

        iamportRequestClient.cancelPayment(PORTONE_PREFIX + IAMPORT_API_SECRET_V2,
                paymentId,
                CancelPaymentRequest.of("invalid value"));
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
