package com.todayeat.backend.order.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.order.dto.request.CreateOrderRequest;
import com.todayeat.backend.order.dto.response.CreateOrderResponse;
import com.todayeat.backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.CREATE_ORDER_SUCCESS;

@Slf4j
@RequiredArgsConstructor
@RestController
public class OrderController implements OrderControllerDocs {

    private final OrderService orderService;

    @Override
    public SuccessResponse<CreateOrderResponse> create(CreateOrderRequest request) {

        return SuccessResponse.of(orderService.create(request), CREATE_ORDER_SUCCESS);
    }
}
