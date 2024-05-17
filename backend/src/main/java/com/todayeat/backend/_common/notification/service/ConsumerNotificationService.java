package com.todayeat.backend._common.notification.service;

import com.todayeat.backend._common.notification.dto.CreateReviewNotification;
import com.todayeat.backend._common.notification.entity.ConsumerNotification;
import com.todayeat.backend._common.notification.repository.ConsumerNotificationRepository;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConsumerNotificationService {

    private final ConsumerNotificationRepository consumerNotificationRepository;
    private final SecurityUtil securityUtil;

    @Transactional
    public void create(CreateReviewNotification createDTO) {

        Consumer consumer = securityUtil.getConsumer();

        consumerNotificationRepository.save(ConsumerNotification.of(createDTO.getType(),
                    createDTO.getReviewId(), createDTO.getContent(), consumer));

    }
}
