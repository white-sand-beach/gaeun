package com.todayeat.backend.oauth2.dto.auth;

import com.todayeat.backend.oauth2.dto.response.OAuth2Response;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Getter
public class OAuth2UserAuthentication implements OAuth2User {

    private final OAuth2Response userInfo;

    @Builder
    private OAuth2UserAuthentication(OAuth2Response userInfo) {
        this.userInfo = userInfo;
    }

    public static OAuth2UserAuthentication of(OAuth2Response userInfo) {

        return builder()
                .userInfo(userInfo)
                .build();
    }

    @Override
    public Map<String, Object> getAttributes() {

        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add((GrantedAuthority) () -> "CONSUMER");
        return collection;
    }

    @Override
    public String getName() {

        return userInfo.getEmail();
    }
}