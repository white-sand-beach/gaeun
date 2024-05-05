package com.todayeat.backend.location.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
@Schema(name = "UpdateLocationRequest", description = "위치 수정 요청")
public class UpdateLocationRequest {

    @Size(max = 10, message = "alias: 길이가 10 이하여야 합니다.")
    @Schema(description = "별명(옵션)", example = "우리집")
    private String alias;
}
