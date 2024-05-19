package com.todayeat.backend.order.repository;

import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationMonthResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationWeekResponse;
import com.todayeat.backend.store.dto.GetStoreSaleCountInfo;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderInfoRepositoryQueryDSL {

    GetSellerRegistrationWeekResponse findRegistrationWeekByStoreId(Long storeId);

    GetSellerRegistrationMonthResponse findRegistrationMonthByStoreId(Long storeId);

    List<GetStoreSaleCountInfo> countFinishedOrdersByStore(LocalDateTime startDate, LocalDateTime endDate);
}
