package com.todayeat.backend.oauth2.dto.response;

import com.todayeat.backend.oauth2.dto.response.status.OAuth2Provider;
import lombok.Builder;
import lombok.ToString;

import java.util.Map;

@ToString
public class KakaoOAuth2Response implements OAuth2Response {

    private OAuth2Provider provider;
    private String email;
    private String profileImgUrl;

    @Builder
    private KakaoOAuth2Response(OAuth2Provider provider, String email, String profileImgUrl) {
        this.provider = provider;
        this.email = email;
        this.profileImgUrl = profileImgUrl;
    }

    public static KakaoOAuth2Response of(Map<String, Object> attributes) {

        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return builder()
                .provider(OAuth2Provider.KAKAO)
                .email((String) kakaoAccount.get("email"))
                .profileImgUrl((String) kakaoProfile.get("profile_image_url"))
                .build();
    }

    @Override
    public OAuth2Provider getProvider() {
        return provider;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getProfileImgUrl() {
        return profileImgUrl;
    }
    
}