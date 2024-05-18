package com.todayeat.backend._common.notification.controller;

import com.todayeat.backend._common.notification.dto.response.GetConsumerNotificationCountResponse;
import com.todayeat.backend._common.notification.dto.response.GetConsumerNotificationListResponse;
import com.todayeat.backend._common.notification.service.ConsumerNotificationService;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ConsumerNotificationController implements ConsumerNotificationControllerDocs {

    private final ConsumerNotificationService consumerNotificationService;

    @Override
    public SuccessResponse<GetConsumerNotificationListResponse> getList(Integer page, Integer size) {

        return SuccessResponse.of(consumerNotificationService.getList(page, size), SuccessType.GET_CONSUMER_NOTIFICATION_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<GetConsumerNotificationCountResponse> getCount() {

        return SuccessResponse.of(consumerNotificationService.getCount(), SuccessType.GET_CONSUMER_NOTIFICATION_COUNT_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> isReadTrue(Long consumerNotificationId) {

        consumerNotificationService.isReadTrue(consumerNotificationId);

        return SuccessResponse.of(SuccessType.UPDATE_CONSUMER_NOTIFICATION_IS_READ_TRUE);
    }
}
