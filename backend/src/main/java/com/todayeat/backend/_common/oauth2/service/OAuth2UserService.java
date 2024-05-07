package com.todayeat.backend._common.oauth2.service;

import com.todayeat.backend._common.oauth2.dto.response.KakaoOAuth2UserResponse;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2UserResponse;
import com.todayeat.backend._common.oauth2.dto.auth.OAuth2UserPrincipal;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2Provider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

        // 기본 OAuth2UserService 객체 생성
        org.springframework.security.oauth2.client.userinfo.OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();

        // OAuth2UserService를 사용하여 OAuth2User 정보를 가져온다.
        OAuth2User oAuth2User = oAuth2UserService.loadUser(oAuth2UserRequest);

        // 클라이언트 등록 ID (kakao)
        String registrationId = oAuth2UserRequest
                .getClientRegistration()
                .getRegistrationId();

        // 액세스 토큰
        String accessToken = oAuth2UserRequest
                .getAccessToken()
                .getTokenValue();

        // 유저 정보
        OAuth2UserResponse oAuth2UserResponse = getOAuth2Response(registrationId, oAuth2User.getAttributes(), accessToken);

        log.info("userInfo: {}", oAuth2UserResponse.toString());

        // 인증 정보
        return OAuth2UserPrincipal.of(oAuth2UserResponse);
    }

    private OAuth2UserResponse getOAuth2Response(String registrationId,
                                                 Map<String, Object> attributes,
                                                 String accessToken) {

        if (OAuth2Provider.KAKAO.getRegistrationId().equals(registrationId)) {
            return KakaoOAuth2UserResponse.of(attributes, accessToken);
        }

        return null;
    }
}
