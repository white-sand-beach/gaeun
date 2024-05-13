package com.todayeat.backend.order.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.cart.entity.Cart;
import com.todayeat.backend.cart.repository.CartRepository;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.order.api.dto.request.CancelPaymentRequest;
import com.todayeat.backend.order.api.dto.response.GetPaymentResponse;
import com.todayeat.backend.order.api.client.IamportRequestClient;
import com.todayeat.backend.order.dto.request.CreateOrderRequest;
import com.todayeat.backend.order.dto.request.ValidateOrderRequest;
import com.todayeat.backend.order.dto.response.CreateOrderResponse;
import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoItem;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import com.todayeat.backend.order.repository.OrderInfoItemRepository;
import com.todayeat.backend.order.repository.OrderInfoRepository;
import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.sale.repository.SaleRepository;
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

import static com.todayeat.backend._common.response.error.ErrorType.*;
import static com.todayeat.backend.order.entity.OrderInfoStatus.PAID;

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

    private String PORTONE_PREFIX = "PortOne ";

    @Transactional
    public CreateOrderResponse create(CreateOrderRequest createOrderRequest) {

        List<String> cartIdList = createOrderRequest.getCartIdList();

        // 첫 번째 장바구니 확인
        // 1. cart 유효성 검사
        // 2. store 유효성 검사
        Store firstStore = findStoreOrElseThrow
                            (findCartOrElseThrow
                                (cartIdList.getFirst()).getStoreId());

        // 3. store 열려 있는지 확인
        if (!firstStore.getIsOpened()) {
            throw new BusinessException(STORE_NOT_OPEN);
        }

        Consumer consumer = securityUtil.getConsumer();

        int totalPrice = 0;

        // 주문 요청된 장바구니 목록 확인
        for (String cartId: cartIdList) {

            Cart cart = findCartOrElseThrow(cartId);

            // 같은 가게가 아닌 경우
            if (!cart.getStoreId().equals(firstStore.getId())) {
                throw new BusinessException(CART_CONFLICT_STORE);
            }

            // 해당 소비자가 아닌 경우
            if (!cart.getConsumerId().equals(consumer.getId())) {
                throw new BusinessException(CART_FORBIDDEN);
            }

            Sale sale = findSaleOrElseThrow(cart);

            // 수량 유효성 검사
            validateQuantity(sale, cart);

            // 결제 금액 증가
            totalPrice += cart.getQuantity() * sale.getSellPrice();
        }

        // 주문 정보 저장
        OrderInfo orderInfo = OrderInfo.of(UUID.randomUUID().toString(), totalPrice, consumer, firstStore);
        orderInfoRepository.save(orderInfo);

        // 주문 아이템 정보 저장
        cartIdList.iterator().forEachRemaining(
                cartId -> {
                    Cart cart = findCartOrElseThrow(cartId);
                    orderInfoItemRepository.save(
                            OrderInfoItem.of(findSaleOrElseThrow(cart), cart.getQuantity(), orderInfo)
                    );
                }
        );

        return CreateOrderResponse.of(orderInfo.getId());
    }

    @Transactional
    public void validate(Long orderInfoId, ValidateOrderRequest request) {

        // 주문 확인
        OrderInfo orderInfo = orderInfoRepository.findByIdAndDeletedAtIsNull(orderInfoId)
                .orElseThrow(() -> new BusinessException(ORDER_NOT_FOUND));

        // 결제 완료된 주문일 경우 throw
        if (orderInfo.getStatus() != OrderInfoStatus.UNPAID) {
            throw new BusinessException(ORDER_ALREADY_PAID);
        }

        // TODO: 통신 에러 처리하기

        // 아임포트 결제 조회
        GetPaymentResponse getPaymentResponse =
                iamportRequestClient.getPayment(PORTONE_PREFIX + IAMPORT_API_SECRET_V2,
                                                request.getPaymentId());

        // 결제 완료 상태가 아니거나 주문 금액과 실제 결제 금액이 다를 경우
        if (!getPaymentResponse.getStatus().equals("PAID")
                || !Objects.equals(getPaymentResponse.getAmount().getTotal(), orderInfo.getTotalPrice())) {

            // 아임 포트 결제 취소
            iamportRequestClient.cancelPayment(PORTONE_PREFIX + IAMPORT_API_SECRET_V2,
                    request.getPaymentId(),
                    CancelPaymentRequest.of("invalid value"));

            // 주문 아이템 삭제
            orderInfoItemRepository.findAllByOrderInfoIdAndDeletedAtIsNull(orderInfoId)
                    .forEach(orderInfoItemRepository::delete);

            // 주문 삭제
            orderInfoRepository.delete(orderInfo);

            throw new BusinessException(ORDER_PAYMENT_FAIL);
        }

        // 결제 정보 및 주문 상태 업데이트
        orderInfo.updatePaymentId(request.getPaymentId());
        orderInfo.updateStatus(PAID);
    }

    private Sale findSaleOrElseThrow(Cart cart) {
        Sale sale = saleRepository.findByIdAndIsFinishedIsFalseAndDeletedAtIsNull(cart.getSaleId())
                .orElseThrow(() -> new BusinessException(SALE_NOT_SELLING));
        return sale;
    }

    private Cart findCartOrElseThrow(String cartId) {

        return cartRepository.findById(cartId)
                .orElseThrow(() -> new BusinessException(CART_NOT_FOUND));
    }

    private Store findStoreOrElseThrow(Long storeId) {

        return storeRepository.findByIdAndDeletedAtIsNull(storeId)
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));
    }

    private void validateQuantity(Sale sale, Cart cart) {
        Integer stock = sale.getStock() - sale.getTotalQuantity();

        // 실제 남은 수량과 장바구니 수량을 비교
        if (stock.compareTo(cart.getQuantity()) < 0) {
            throw new BusinessException(CART_QUANTITY_MORE_THAN_REST_STOCK);
        }
    }
}
