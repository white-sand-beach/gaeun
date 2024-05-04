package com.todayeat.backend.location.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Schema(name = "UpdateLocationRequest", description = "위치 수정 요청")
public class UpdateLocationRequest {

    @NotBlank(message = "address: 값이 비어 있지 않아야 합니다.")
    @Size(max = 50, message = "address: 길이가 50 이하여야 합니다.")
    @Schema(description = "주소값", example = "경상북도 구미시 3공단3로 302")
    private String address;

    @NotNull(message = "latitude: 값이 null이 아니어야 합니다.")
    @DecimalMin(value = "33", message = "latitude: 33 이상이어야 합니다.")
    @DecimalMax(value = "38", message = "latitude: 38 이하이어야 합니다.")
    @Schema(description = "위도", example = "36.108184")
    private BigDecimal latitude;

    @NotNull(message = "longitude: 값이 null이 아니어야 합니다.")
    @DecimalMin(value = "124", message = "longitude: 124 이상이어야 합니다.")
    @DecimalMax(value = "132", message = "longitude: 132 이하이어야 합니다.")
    @Schema(description = "경도", example = "128.413967")
    private BigDecimal longitude;

    @Size(max = 10, message = "alias: 길이가 10 이하여야 합니다.")
    @Schema(description = "별명(옵션)", example = "우리집")
    private String alias;

    @NotNull(message = "radius: 값이 null이 아니어야 합니다.")
    @Min(value = 1, message = "radius: 값이 1 이상이어야 합니다.")
    @Max(value = 3, message = "radius: 값이 3 이하여야 합니다.")
    @Schema(description = "반경(km)", example = "2")
    private Integer radius;
}
