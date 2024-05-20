package com.todayeat.backend._common.statistic.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend._common.statistic.dto.response.GetConsumerReceiptAllResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerReceiptAllResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationMonthResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationWeekResponse;
import com.todayeat.backend._common.statistic.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StatisticController implements StatisticControllerDocs {

    private final StatisticService statisticService;

    @Override
    public SuccessResponse<GetConsumerReceiptAllResponse> getConsumerReceiptAll() {

        return SuccessResponse.of(statisticService.getConsumerReceiptAll(), SuccessType.GET_CONSUMER_RECEIPT_ALL_SUCCESS);
    }

    @Override
    public SuccessResponse<GetSellerReceiptAllResponse> getSellerReceiptAll(Long storeId) {

        return SuccessResponse.of(statisticService.getSellerReceiptAll(storeId), SuccessType.GET_SELLER_RECEIPT_ALL_SUCCESS);
    }

    @Override
    public SuccessResponse<GetSellerRegistrationWeekResponse> getSellerRegistrationWeek(Long storeId) {

        return SuccessResponse.of(statisticService.getSellerRegistrationWeek(storeId), SuccessType.GET_SELLER_REGISTRATION_WEEK_SUCCESS);
    }

    @Override
    public SuccessResponse<GetSellerRegistrationMonthResponse> getSellerRegistrationMonth(Long storeId) {

        return SuccessResponse.of(statisticService.getSellerRegistrationMonth(storeId), SuccessType.GET_SELLER_REGISTRATION_MONTH_SUCCESS);
    }
}
