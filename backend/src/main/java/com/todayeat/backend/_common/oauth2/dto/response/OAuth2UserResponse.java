package com.todayeat.backend._common.oauth2.dto.response;

public interface OAuth2UserResponse {

    OAuth2Provider getSocialType();
    String getEmail();
    String getProfileImage();
    String getAccessToken();
}
