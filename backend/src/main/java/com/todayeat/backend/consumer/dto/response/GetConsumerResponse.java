package com.todayeat.backend.consumer.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "GetConsumerResponse", description = "소비자 회원 정보 조회 응답")
public class GetConsumerResponse {

    @Schema(description = "프로필 이미지 URL", example = "--")
    private String imageUrl;

    @Schema(description = "닉네임", example = "김지녕")
    private String nickname;

    @Schema(description = "휴대폰 번호", example = "01012345678")
    private String phoneNumber;

    @Schema(description = "나눔 여부. 일반인인 경우 false, 아닐 경우 true", example = "false")
    private Boolean isDonated;

    @Builder
    private GetConsumerResponse(String imageUrl, String nickname, String phoneNumber, Boolean isDonated) {
        this.imageUrl = imageUrl;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.isDonated = isDonated;
    }
}
