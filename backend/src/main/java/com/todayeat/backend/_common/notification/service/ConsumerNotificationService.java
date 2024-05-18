package com.todayeat.backend._common.notification.service;

import com.todayeat.backend._common.notification.dto.response.*;
import com.todayeat.backend._common.notification.entity.ConsumerNotification;
import com.todayeat.backend._common.notification.entity.SellerNotification;
import com.todayeat.backend._common.notification.repository.ConsumerNotificationRepository;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.seller.entity.Seller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConsumerNotificationService {

    private final ConsumerNotificationRepository consumerNotificationRepository;
    private final SecurityUtil securityUtil;

    public GetConsumerNotificationListResponse getList(Integer page, Integer size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Consumer consumer = securityUtil.getConsumer();

        Slice<ConsumerNotification> notificationList = consumerNotificationRepository.findAllByConsumerIdAndDeletedAtIsNull(consumer.getId(), pageable);

        return GetConsumerNotificationListResponse.of(
                notificationList.getContent().stream().map(GetConsumerNotificationResponse::from)
                        .collect(Collectors.toList()),
                notificationList.getNumber(),
                notificationList.hasNext()
        );
    }

    @Transactional
    public GetConsumerNotificationCountResponse getCount() {
        Consumer consumer = securityUtil.getConsumer();

        return GetConsumerNotificationCountResponse.of(consumerNotificationRepository.countByIsReadFalse(consumer.getId()));
    }

    @Transactional
    public void isReadTrue(Long consumerNotificationId) {

        ConsumerNotification consumerNotification = consumerNotificationRepository.findByIdAndDeletedAtIsNull(consumerNotificationId)
                .orElseThrow(() -> new BusinessException(ErrorType.NOTIFICATION_NOT_FOUND));

        consumerNotification.isReadTrue();
    }
}
