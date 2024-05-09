package com.todayeat.backend.consumer.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.consumer.dto.request.CheckNicknameRequest;
import com.todayeat.backend.consumer.dto.request.UpdateConsumerRequest;
import com.todayeat.backend.consumer.dto.response.CheckNicknameResponse;
import com.todayeat.backend.consumer.dto.response.GetConsumerProfileResponse;
import com.todayeat.backend.consumer.service.ConsumerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ConsumerController implements ConsumerControllerDocs {

    private final ConsumerService consumerService;

    @Override
    public SuccessResponse<Void> update(UpdateConsumerRequest request) {

        consumerService.update(request);
        return SuccessResponse.of(UPDATE_CONSUMER_SUCCESS);
    }

    @Override
    public SuccessResponse<CheckNicknameResponse> checkNickname(CheckNicknameRequest request) {

        return SuccessResponse.of(consumerService.checkNickname(request), CHECK_NICKNAME_SUCCESS);
    }

    @Override
    public SuccessResponse<GetConsumerProfileResponse> getProfile() {

        return SuccessResponse.of(consumerService.getProfile(), GET_CONSUMER_PROFILE_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> logout(HttpServletRequest request, HttpServletResponse response) {

        consumerService.logout(request, response);
        return SuccessResponse.of(LOGOUT_CONSUMER_SUCCESS);
    }
}
