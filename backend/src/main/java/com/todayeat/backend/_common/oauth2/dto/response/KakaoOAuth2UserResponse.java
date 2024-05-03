package com.todayeat.backend._common.oauth2.dto.response;

import lombok.Builder;
import lombok.ToString;

import java.util.Map;

@ToString
public class KakaoOAuth2UserResponse implements OAuth2UserResponse {

    private OAuth2Provider socialType;
    private String email;
    private String profileImage;

    @Builder
    private KakaoOAuth2UserResponse(OAuth2Provider socialType, String email, String profileImage) {
        this.socialType = socialType;
        this.email = email;
        this.profileImage = profileImage;
    }

    public static KakaoOAuth2UserResponse of(Map<String, Object> attributes) {

        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return builder()
                .socialType(OAuth2Provider.KAKAO)
                .email((String) kakaoAccount.get("email"))
                .profileImage((String) kakaoProfile.get("profile_image_url"))
                .build();
    }

    public OAuth2Provider getSocialType() {
        return socialType;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getProfileImage() {
        return profileImage;
    }
    
}