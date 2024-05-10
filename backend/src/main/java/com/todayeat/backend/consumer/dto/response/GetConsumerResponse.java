package com.todayeat.backend.consumer.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "GetConsumerResponse", description = "소비자 회원 정보 조회 응답")
public class GetConsumerResponse {

    @Schema(description = "프로필 이미지 URL", example = "--")
    private String profileImage;

    @Schema(description = "닉네임", example = "김지녕")
    private String nickname;

    @Schema(description = "휴대폰 번호", example = "01012345678")
    private String phoneNumber;

    @Builder
    private GetConsumerResponse(String profileImage, String nickname, String phoneNumber) {
        this.profileImage = profileImage;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
    }
}
