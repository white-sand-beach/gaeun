package com.todayeat.backend.oauth2.dto.response;

import com.todayeat.backend.oauth2.dto.response.status.OAuth2Provider;

public interface OAuth2Response {

    OAuth2Provider getProvider();
    String getEmail();
    String getProfileImgUrl();
}
