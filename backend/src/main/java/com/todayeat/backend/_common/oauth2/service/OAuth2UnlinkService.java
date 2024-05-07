package com.todayeat.backend._common.oauth2.service;

import com.todayeat.backend._common.oauth2.api.KakaoRequestClient;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2Provider;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2UnlinkService {

    private final KakaoRequestClient kakaoRequestClient;

    public void unlink(OAuth2UserResponse oAuth2UserResponse) {

        OAuth2Provider socialType = oAuth2UserResponse.getSocialType();

        // 소셜 연결 끊기
        if (socialType == OAuth2Provider.KAKAO) {
            kakaoUnlink(oAuth2UserResponse.getAccessToken());
        }

    }

    private void kakaoUnlink(String accessToken) {

        log.info("[OAuth2UnlinkService.kakaoUnlink]");
        kakaoRequestClient.unlink("Bearer " + accessToken);
    }


}
