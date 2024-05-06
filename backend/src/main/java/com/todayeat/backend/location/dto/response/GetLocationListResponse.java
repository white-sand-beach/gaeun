package com.todayeat.backend.location.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetLocationListResponse", description = "위치 목록 조회 응답")
public class GetLocationListResponse {

    @Schema(description = "위치 정보")
    private List<GetLocationResponse> locations;

    @Builder
    private GetLocationListResponse(List<GetLocationResponse> locations) {
        this.locations = locations;
    }

    public static GetLocationListResponse of(List<GetLocationResponse> locations) {
        return builder()
                .locations(locations)
                .build();
    }
}
