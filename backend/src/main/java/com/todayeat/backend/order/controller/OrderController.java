package com.todayeat.backend.order.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.order.dto.request.consumer.CreateOrderConsumerRequest;
import com.todayeat.backend.order.dto.request.seller.UpdateStatusSellerRequest;
import com.todayeat.backend.order.dto.request.consumer.ValidateOrderConsumerRequest;
import com.todayeat.backend.order.dto.response.consumer.CreateOrderResponse;
import com.todayeat.backend.order.dto.response.consumer.GetOrderListConsumerResponse;
import com.todayeat.backend.order.dto.response.seller.GetOrderListFinishedSellerResponse;
import com.todayeat.backend.order.dto.response.seller.GetOrderListInProgressSellerResponse;
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
    public SuccessResponse<CreateOrderResponse> create(CreateOrderConsumerRequest request) {

        return SuccessResponse.of(orderService.create(request), CREATE_ORDER_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> validation(Long orderInfoId, ValidateOrderConsumerRequest request) {

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

    @Override
    public SuccessResponse<GetOrderListConsumerResponse> getListConsumer() {

        return SuccessResponse.of(orderService.getListConsumer(), GET_ORDER_LIST_CONSUMER_SUCCESS);
    }

    @Override
    public SuccessResponse<GetOrderListInProgressSellerResponse> getInProgressListSeller(Long storeId) {

        return SuccessResponse.of(orderService.getInProgressListSeller(storeId), GET_ORDER_IN_PROGRESS_LIST_SELLER_SUCCESS);
    }

    @Override
    public SuccessResponse<GetOrderListFinishedSellerResponse> getFinishedListSeller(Long storeId) {

        return SuccessResponse.of(orderService.getFinishedListSeller(storeId), GET_ORDER_FINISHED_LIST_SELLER_SUCCESS);
    }
}
