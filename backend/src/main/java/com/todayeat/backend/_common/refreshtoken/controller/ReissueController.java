package com.todayeat.backend._common.refreshtoken.controller;

import com.todayeat.backend._common.refreshtoken.service.RefreshTokenService;
import com.todayeat.backend._common.response.success.SuccessResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.REISSUE_TOKEN_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReissueController implements ReissueControllerDocs{

    private final RefreshTokenService refreshTokenService;

    @PostMapping
    public SuccessResponse<Void> reissueToken(HttpServletRequest request, HttpServletResponse response) {

        refreshTokenService.reissue(request, response);
        return SuccessResponse.of(REISSUE_TOKEN_SUCCESS);
    }
}
