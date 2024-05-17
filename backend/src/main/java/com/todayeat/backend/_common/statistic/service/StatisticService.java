package com.todayeat.backend._common.statistic.service;

import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.statistic.dto.response.GetConsumerReceiptAllResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerReceiptAllResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationMonthResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationWeekResponse;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.order.repository.OrderInfoRepository;
import com.todayeat.backend.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticService {

    private final OrderInfoRepository orderInfoRepository;
    private final StoreRepository storeRepository;

    private final SecurityUtil securityUtil;

    public GetConsumerReceiptAllResponse getConsumerReceiptAll() {

        return GetConsumerReceiptAllResponse.of(securityUtil.getConsumer().getOrderCnt());
    }

    public GetSellerReceiptAllResponse getSellerReceiptAll(Long storeId) {

        return GetSellerReceiptAllResponse.of(
                storeRepository.findById(storeId)
                        .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND))
                        .getSaleCnt());
    }

    public GetSellerRegistrationWeekResponse getSellerRegistrationWeek(Long storeId) {

        return orderInfoRepository.findRegistrationWeekByStoreId(storeId);
    }

    public GetSellerRegistrationMonthResponse getSellerRegistrationMonth(Long storeId) {

        return orderInfoRepository.findRegistrationMonthByStoreId(storeId);
    }
}
