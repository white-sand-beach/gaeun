package com.todayeat.backend._common.notification.service;

import com.todayeat.backend._common.notification.dto.CreateFavoriteNotification;
import com.todayeat.backend._common.notification.dto.CreateOrderNotification;
import com.todayeat.backend._common.notification.dto.response.*;
import com.todayeat.backend._common.notification.entity.ConsumerNotification;
import com.todayeat.backend._common.notification.repository.ConsumerNotificationRepository;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.favorite.entity.Favorite;
import com.todayeat.backend.favorite.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConsumerNotificationService {

    private final ConsumerNotificationRepository consumerNotificationRepository;
    private final FavoriteRepository favoriteRepository;
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

    @Transactional
    public CreateFavoriteNotification CreateFavoriteNotification(CreateFavoriteNotification createDTO) {

        List<Consumer> consumerList = favoriteRepository.findAllByStoreIdAndDeletedAtIsNull(createDTO.getStoreId())
                .stream().map(Favorite::getConsumer)
                .toList();

        List<ConsumerNotification> consumerNotificationList = new ArrayList<>();
        List<Long> consumerIdList = new ArrayList<>();

        for(Consumer c : consumerList) {
            consumerNotificationList.add(ConsumerNotification.of(createDTO.getType(), createDTO.getTypeId(), createDTO.getContent(), c));
            consumerIdList.add(c.getId());
        }

        consumerNotificationRepository.saveAll(consumerNotificationList);

        createDTO.updateConsumerIdList(consumerIdList);

        return createDTO;
    }

    @Transactional
    public void createOrderNotification(CreateOrderNotification createDTO, Consumer consumer) {

        consumerNotificationRepository.save(ConsumerNotification.of(
                createDTO.getType(),
                createDTO.getTypeId(),
                createDTO.getContent(),
                consumer
        ));
    }
}
