package com.todayeat.backend.order.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.order.dto.request.seller.UpdateStatusSellerRequest;
import com.todayeat.backend.order.dto.request.consumer.ValidateOrderConsumerRequest;
import com.todayeat.backend.order.dto.response.consumer.CreateOrderResponse;
import com.todayeat.backend.order.dto.response.consumer.GetOrderDetailConsumerResponse;
import com.todayeat.backend.order.dto.response.consumer.GetOrderDetailSellerResponse;
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
    public SuccessResponse<CreateOrderResponse> create() {

        return SuccessResponse.of(orderService.create(), CREATE_ORDER_SUCCESS);
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
    public SuccessResponse<GetOrderListConsumerResponse> getListConsumer(Integer page, Integer size, String keyword) {

        return SuccessResponse.of(orderService.getListConsumer(page, size, keyword), GET_ORDER_LIST_CONSUMER_SUCCESS);
    }

    @Override
    public SuccessResponse<GetOrderListInProgressSellerResponse> getInProgressListSeller(Long storeId, Integer page, Integer size) {

        return SuccessResponse.of(orderService.getInProgressListSeller(storeId, page, size), GET_ORDER_IN_PROGRESS_LIST_SELLER_SUCCESS);
    }

    @Override
    public SuccessResponse<GetOrderListFinishedSellerResponse> getFinishedListSeller(Long storeId, Integer page, Integer size, String orderNo) {

        return SuccessResponse.of(orderService.getFinishedListSeller(storeId, page, size, orderNo), GET_ORDER_FINISHED_LIST_SELLER_SUCCESS);
    }

    @Override
    public SuccessResponse<GetOrderDetailConsumerResponse> getOrderDetailConsumer(Long orderInfoId) {

        return SuccessResponse.of(orderService.getOrderDetailConsumer(orderInfoId), GET_ORDER_DETAIL_CONSUMER_SUCCESS);
    }

    @Override
    public SuccessResponse<GetOrderDetailSellerResponse> getOrderDetailSeller(Long orderInfoId) {

        return SuccessResponse.of(orderService.getOrderDetailSeller(orderInfoId), GET_ORDER_DETAIL_SELLER_SUCCESS);
    }
}
