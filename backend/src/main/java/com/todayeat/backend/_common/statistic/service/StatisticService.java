package com.todayeat.backend._common.statistic.service;

import com.todayeat.backend._common.statistic.dto.response.GetConsumerReceiptAllResponse;
import com.todayeat.backend._common.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticService {

    private final SecurityUtil securityUtil;

    public GetConsumerReceiptAllResponse getConsumerReceiptAll() {

        return GetConsumerReceiptAllResponse.of(securityUtil.getConsumer().getOrderCnt());
    }
}
