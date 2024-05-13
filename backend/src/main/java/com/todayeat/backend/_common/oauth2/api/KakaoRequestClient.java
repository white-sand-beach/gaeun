package com.todayeat.backend._common.oauth2.api;

import com.todayeat.backend.order.api.dto.response.GetPaymentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "KakaoRequestClient", url = "https://kapi.kakao.com")
public interface KakaoRequestClient {

    @PostMapping(value = "/v1/user/unlink", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    GetPaymentResponse unlink(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken);
}
