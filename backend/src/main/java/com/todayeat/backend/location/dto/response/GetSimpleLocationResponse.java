package com.todayeat.backend.location.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Schema(name = "GetSimpleLocationResponse", description = "위치 간편 조회 응답")
public class GetSimpleLocationResponse {

    @Schema(description = "위도", example = "36.108184")
    private BigDecimal latitude;

    @Schema(description = "경도", example = "128.413967")
    private BigDecimal longitude;

    @Schema(description = "반경(km)", example = "2")
    private Integer radius;
}
