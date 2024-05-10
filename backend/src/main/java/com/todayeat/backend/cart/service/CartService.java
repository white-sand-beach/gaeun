package com.todayeat.backend.cart.service;

import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.cart.dto.request.CreateCartRequest;
import com.todayeat.backend.cart.dto.request.UpdateQuantityRequest;
import com.todayeat.backend.cart.dto.response.GetCartListResponse;
import com.todayeat.backend.cart.dto.response.GetCartResponse;
import com.todayeat.backend.cart.entity.Cart;
import com.todayeat.backend.cart.mapper.CartMapper;
import com.todayeat.backend.cart.repository.CartRepository;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.sale.mapper.SaleMapper;
import com.todayeat.backend.sale.repository.SaleRepository;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartService {

    private final CartRepository cartRepository;
    private final StoreRepository storeRepository;
    private final SaleRepository saleRepository;
    private final SecurityUtil securityUtil;

    @Transactional
    public void create(CreateCartRequest request) {

        Consumer consumer = securityUtil.getConsumer();

        // 가게 존재 여부, 가게가 열려 있는지 확인
        Store store = storeRepository
                .findByIdAndIsOpenedIsTrueAndDeletedAtIsNull(request.getStoreId())
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_OPEN));

        // 장바구니에 다른 가게 음식이 담겨있는지 확인
        validateDifferentStore(consumer.getId(), store.getId());

        // 해당 가게에 판매 존재 여부, 판매 중지인지 확인
        Sale sale = saleRepository
                .findByIdAndStoreAndIsFinishedIsFalseAndDeletedAtIsNull(request.getSaleId(), store)
                .orElseThrow(() -> new BusinessException(ErrorType.SALE_NOT_SELLING));

        // 이미 장바구니에 있는지 확인
        Optional<Cart> cart = cartRepository.findByConsumerIdAndSaleId(consumer.getId(), sale.getId());

        if(cart.isEmpty()) {

            // 수량이 남은 재고 보다 작거나 같은지 확인
            validateQuantityAndRestStock(request.getQuantity(), sale.getStock(), sale.getTotalQuantity());

            // 장바구니 저장
            cartRepository
                    .save(CartMapper.INSTANCE
                            .createCartRequestToCart(request, consumer.getId()));
        } else {

            // 수량 업데이트
            cart.get().updateQuantity(cart.get().getQuantity() + request.getQuantity());

            // 수량이 남은 재고 보다 작거나 같은지 확인
            validateQuantityAndRestStock(cart.get().getQuantity(), sale.getStock(), sale.getTotalQuantity());

            // 레디스에 수량 업데이트
            cartRepository.save(cart.get());
        }
    }

    public GetCartListResponse getList() {

        Consumer consumer = securityUtil.getConsumer();

        List<Cart> cartList = cartRepository.findAllByConsumerId(consumer.getId());

        Long storeId = cartList.isEmpty() ? null : cartList.getFirst().getStoreId();
        Optional<Store> store = storeRepository.findByIdAndDeletedAtIsNull(storeId);
        String storeName = store.isEmpty() ? null : store.get().getName();
        Boolean isOpened = store.isEmpty() ? null : store.get().isOpened();

        List<GetCartResponse> cartResponseList = new ArrayList<>();

        Integer originalTotalPrice = 0; // 원가 총합
        Integer sellTotalPrice = 0; // 할인가 총합

        for(Cart c : cartList) {

            Sale sale = saleRepository.findByIdAndDeletedAtIsNull(c.getSaleId())
                    .orElse(null);

            if(sale == null)
                continue;

            Integer restStock = sale.getStock() - sale.getTotalQuantity();

            cartResponseList.add(SaleMapper
                    .INSTANCE.getCartResponse(c.getId(), sale, restStock, c.getQuantity()));

            // (현재 남은 재고 - 장바구니에 넣은 수량)이 음수여도 보여는 준다. 대신 결제 금액에는 반영하지 않도록 한다.
            if(restStock - c.getQuantity() >= 0) {
                originalTotalPrice += sale.getOriginalPrice() * c.getQuantity();
                sellTotalPrice += sale.getSellPrice() * c.getQuantity();
            }
        }

        return GetCartListResponse.of(storeId, storeName, isOpened, cartResponseList,
                originalTotalPrice, originalTotalPrice - sellTotalPrice, sellTotalPrice);
    }

    @Transactional
    public void updateQuantity(String cartId, UpdateQuantityRequest request) {

        Consumer consumer = securityUtil.getConsumer();

        // 장바구니 존재 확인
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new BusinessException(ErrorType.CART_NOT_FOUND));

        // 내 장바구니가 맞는지 확인
        if (!Objects.equals(cart.getConsumerId(), consumer.getId())) {
            throw new BusinessException(ErrorType.CART_FORBIDDEN);
        }

        // 가게 존재 여부, 가게가 열려 있는지 확인
        Store store = storeRepository
                .findByIdAndDeletedAtIsNull(request.getStoreId())
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_OPEN));

        // 해당 가게에 판매 존재 여부, 판매 중지인지 확인
        Sale sale = saleRepository
                .findByIdAndStoreAndIsFinishedIsFalseAndDeletedAtIsNull(request.getSaleId(), store)
                .orElseThrow(() -> new BusinessException(ErrorType.SALE_NOT_SELLING));

        cart.updateQuantity(request.getQuantity());

        // 수량이 남은 재고 보다 작거나 같은지 확인
        validateQuantityAndRestStock(cart.getQuantity(), sale.getStock(), sale.getTotalQuantity());

        cartRepository.save(cart);
    }

    @Transactional
    public void delete(String cartId) {

        Consumer consumer = securityUtil.getConsumer();

        // 장바구니 존재 확인
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new BusinessException(ErrorType.CART_NOT_FOUND));

        // 내 장바구니가 맞는지 확인
        if (!Objects.equals(cart.getConsumerId(), consumer.getId())) {
            throw new BusinessException(ErrorType.CART_FORBIDDEN);
        }

        cartRepository.delete(cart);
    }

    @Transactional
    public void deleteAll() {

        Consumer consumer = securityUtil.getConsumer();

        List<Cart> cartList = cartRepository.findAllByConsumerId(consumer.getId());

        cartRepository.deleteAll(cartList);
    }

    private void validateQuantityAndRestStock(Integer quantity, Integer stock, Integer totalQuantity) {

        if (stock - totalQuantity - quantity < 0)
            throw new BusinessException(ErrorType.CART_QUANTITY_MORE_THAN_REST_STOCK);
    }

    private void validateDifferentStore(Long consumerId, Long storeId) {

        List<Cart> cartList = cartRepository.findAllByConsumerId(consumerId);

        for(Cart c : cartList) {
            if(!Objects.equals(c.getStoreId(), storeId)) {

                throw new BusinessException(ErrorType.SALE_NOT_SELLING);
            }
        }
    }
}
