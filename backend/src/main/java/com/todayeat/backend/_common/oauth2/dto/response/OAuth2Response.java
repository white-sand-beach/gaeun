package com.todayeat.backend._common.oauth2.dto.response;

public interface OAuth2Response {

    OAuth2Provider getSocialType();
    String getEmail();
    String getProfileImage();
}
