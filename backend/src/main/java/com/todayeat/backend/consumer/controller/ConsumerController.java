package com.todayeat.backend.consumer.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.consumer.dto.request.UpdateConsumerRequest;
import com.todayeat.backend.consumer.service.ConsumerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.UPDATE_CONSUMER_SUCCESS;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ConsumerController implements ConsumerControllerDocs {

    private final ConsumerService consumerService;

    @Override
    public SuccessResponse update(UpdateConsumerRequest request) {

        consumerService.update(request);
        return SuccessResponse.of(UPDATE_CONSUMER_SUCCESS);
    }
}
