package com.todayeat.backend.fcmtoken.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
@Schema(name = "DeleteFCMTokenRequest", description = "fcm 토큰 삭제 요청")
public class DeleteFCMTokenRequest {

    @NotBlank(message = "token: 값이 비어 있지 않아야 합니다.")
    @Schema(description = "fcm 토큰", example = "asdjofijweoifjwaoijfowaijef")
    private String token;
}
