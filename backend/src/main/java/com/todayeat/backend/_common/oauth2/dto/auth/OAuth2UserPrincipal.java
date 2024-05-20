package com.todayeat.backend._common.oauth2.dto.auth;

import com.todayeat.backend._common.oauth2.dto.response.OAuth2UserResponse;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Getter
public class OAuth2UserPrincipal implements OAuth2User {

    private final OAuth2UserResponse oAuth2UserResponse;

    @Builder
    private OAuth2UserPrincipal(OAuth2UserResponse oAuth2UserResponse) {
        this.oAuth2UserResponse = oAuth2UserResponse;
    }

    public static OAuth2UserPrincipal of(OAuth2UserResponse oAuth2UserResponse) {

        return builder()
                .oAuth2UserResponse(oAuth2UserResponse)
                .build();
    }

    @Override
    public Map<String, Object> getAttributes() {

        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add((GrantedAuthority) () -> "ROLE_CONSUMER");
        return collection;
    }

    @Override
    public String getName() {

        return oAuth2UserResponse.getEmail();
    }
}