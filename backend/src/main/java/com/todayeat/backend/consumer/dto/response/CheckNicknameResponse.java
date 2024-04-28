package com.todayeat.backend.consumer.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Schema(name = "CheckNicknameResponse", description = "소비자 닉네임 중복 확인 응답")
@Getter
public class CheckNicknameResponse {

    @Schema(description = "사용 가능 여부", example = "true")
    private Boolean isValid;

    @Builder
    private CheckNicknameResponse(Boolean isValid) {
        this.isValid = isValid;
    }

    public static CheckNicknameResponse of(Boolean isValid) {
        return builder()
                .isValid(isValid)
                .build();
    }
}
