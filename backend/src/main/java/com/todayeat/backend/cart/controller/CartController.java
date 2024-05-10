package com.todayeat.backend.cart.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.cart.dto.request.CreateCartRequest;
import com.todayeat.backend.cart.dto.request.UpdateQuantityRequest;
import com.todayeat.backend.cart.dto.response.GetCartListResponse;
import com.todayeat.backend.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CartController implements CartControllerDocs {

    private final CartService cartService;

    @Override
    public SuccessResponse<Void> create(CreateCartRequest request) {

        cartService.create(request);

        return SuccessResponse.of(SuccessType.CREATE_CART_SUCCESS);
    }

    @Override
    public SuccessResponse<GetCartListResponse> getList() {

        return SuccessResponse.of(cartService.getList(), SuccessType.GET_CART_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updateQuantity(String cartId, UpdateQuantityRequest request) {

        cartService.updateQuantity(cartId, request);

        return  SuccessResponse.of(SuccessType.UPDATE_CART_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> delete(String cartId) {

        cartService.delete(cartId);

        return SuccessResponse.of(SuccessType.DELETE_CART_SUCCESS);
    }
}
