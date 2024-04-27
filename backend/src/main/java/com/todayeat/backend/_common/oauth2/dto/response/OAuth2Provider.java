package com.todayeat.backend._common.oauth2.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OAuth2Provider {

    KAKAO("kakao"),
    ;

    private final String registrationId;

}
