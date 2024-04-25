package com.todayeat.backend.oauth2.dto.response;

import lombok.Builder;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@ToString
@Setter
public class KakaoOAuth2Response implements OAuth2Response {

    private OAuth2Provider socialType;
    private String email;
    private String profileImage;

    @Builder
    private KakaoOAuth2Response(OAuth2Provider socialType, String email, String profileImage) {
        this.socialType = socialType;
        this.email = email;
        this.profileImage = profileImage;
    }

    public static KakaoOAuth2Response of(Map<String, Object> attributes) {

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