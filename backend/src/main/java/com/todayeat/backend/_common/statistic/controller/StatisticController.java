package com.todayeat.backend._common.statistic.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend._common.statistic.dto.response.GetConsumerReceiptAllResponse;
import com.todayeat.backend._common.statistic.service.StatisticService;
import com.todayeat.backend.store.controller.StoreControllerDocs;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.*;
import com.todayeat.backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

import static com.todayeat.backend._common.response.success.SuccessType.*;

@RestController
@RequiredArgsConstructor
public class StatisticController implements StatisticControllerDocs {

    private final StatisticService statisticService;

    @Override
    public SuccessResponse<GetConsumerReceiptAllResponse> getConsumerReceiptAll() {

        return SuccessResponse.of(statisticService.getConsumerReceiptAll(), SuccessType.GET_CONSUMER_RECEIPT_ALL_SUCCESS);
    }
}
