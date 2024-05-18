package com.todayeat.backend.order.repository;

import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationMonthResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationWeekResponse;

public interface OrderInfoRepositoryQueryDSL {

    GetSellerRegistrationWeekResponse findRegistrationWeekByStoreId(Long storeId);

    GetSellerRegistrationMonthResponse findRegistrationMonthByStoreId(Long storeId);
}
