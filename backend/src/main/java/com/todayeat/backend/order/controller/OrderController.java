package com.todayeat.backend.order.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.order.dto.request.CreateOrderRequest;
import com.todayeat.backend.order.dto.request.UpdateStatusSellerRequest;
import com.todayeat.backend.order.dto.request.ValidateOrderRequest;
import com.todayeat.backend.order.dto.response.CreateOrderResponse;
import com.todayeat.backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class OrderController implements OrderControllerDocs {

    private final OrderService orderService;

    @Override
    public SuccessResponse<CreateOrderResponse> create(CreateOrderRequest request) {

        return SuccessResponse.of(orderService.create(request), CREATE_ORDER_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> validation(Long orderInfoId, ValidateOrderRequest request) {

        orderService.validate(orderInfoId, request);
        return SuccessResponse.of(VALIDATE_ORDER_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updateStatusBySeller(Long orderInfoId, UpdateStatusSellerRequest request) {

        orderService.updateStatusSeller(orderInfoId, request);
        return SuccessResponse.of(UPDATE_ORDER_SELLER_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updateStatusByConsumer(Long orderInfoId) {

        orderService.updateStatusConsumer(orderInfoId);
        return SuccessResponse.of(UPDATE_ORDER_CONSUMER_SUCCESS);
    }
}
