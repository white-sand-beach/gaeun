package com.todayeat.backend.consumer.dto.response;

import com.todayeat.backend._common.oauth2.dto.response.OAuth2Provider;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "GetConsumerResponse", description = "소비자 프로필 조회 응답")
public class GetConsumerProfileResponse {

    @Schema(description = "프로필 이미지 URL", example = "--")
    private String profileImage;

    @Schema(description = "닉네임", example = "김지녕")
    private String nickname;

    @Schema(description = "소셜 타입", example = "KAKAO")
    private OAuth2Provider socialType;

    @Schema(description = "이메일", example = "pangdoonbabo@naver.com")
    private String email;

    @Builder
    private GetConsumerProfileResponse(String profileImage, String nickname, OAuth2Provider socialType, String email) {
        this.profileImage = profileImage;
        this.nickname = nickname;
        this.socialType = socialType;
        this.email = email;
    }
}
