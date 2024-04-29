package com.todayeat.backend.location.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Schema(name = "GetLocationResponse", description = "위치 조회 응답")
public class GetLocationResponse {

    @Schema(description = "위치 고유번호", example = "1")
    private Long locationId;

    @Schema(description = "주소값", example = "경상북도 구미시 3공단3로 302")
    private String address;

    @Schema(description = "위도", example = "36.108184")
    private BigDecimal latitude;

    @Schema(description = "경도", example = "128.413967")
    private BigDecimal longitude;

    @Schema(description = "별명(옵션)", example = "우리집")
    private String alias;

    @Schema(description = "선택 여부", example = "true")
    private Boolean isSelected;

    @Schema(description = "반경(km)", example = "2")
    private Integer radius;

    @Builder
    private GetLocationResponse(Long locationId, String address, BigDecimal latitude, BigDecimal longitude, String alias, Boolean isSelected, Integer radius) {
        this.locationId = locationId;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.alias = alias;
        this.isSelected = isSelected;
        this.radius = radius;
    }
}
