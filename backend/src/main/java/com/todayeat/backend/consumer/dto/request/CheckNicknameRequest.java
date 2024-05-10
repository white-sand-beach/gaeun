package com.todayeat.backend.consumer.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
@Schema(name = "CheckNicknameRequest", description = "소비자 닉네임 중복 확인 요청")
public class CheckNicknameRequest {

    @NotBlank(message = "nickname: 값이 비어 있지 않아야 합니다.")
    @Size(min = 2, max = 8, message = "nickname: 길이가 2에서 10 사이여야 합니다.")
    @Schema(description = "닉네임", example = "김지녕")
    private String nickname;
}
