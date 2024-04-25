package com.todayeat.backend.oauth2.dto.response;

public interface OAuth2Response {

    OAuth2Provider getProvider();
    String getEmail();
    String getProfileImgUrl();
}
