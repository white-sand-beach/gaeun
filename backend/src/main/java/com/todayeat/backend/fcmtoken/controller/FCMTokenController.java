package com.todayeat.backend.fcmtoken.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.fcmtoken.dto.request.CreateFCMTokenRequest;
import com.todayeat.backend.fcmtoken.service.FCMTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FCMTokenController implements FCMTokenControllerDocs{

    private final FCMTokenService fcmTokenService;

    @Override
    public SuccessResponse<Void> create(CreateFCMTokenRequest request) {

        fcmTokenService.create(request);

        return SuccessResponse.of(SuccessType.CREATE_FCM_TOKEN_SUCCESS);
    }
}
