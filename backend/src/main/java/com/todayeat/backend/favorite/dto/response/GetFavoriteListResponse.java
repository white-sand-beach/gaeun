package com.todayeat.backend.favorite.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetFavoriteListResponse", description = "찜 목록 조회 응답")
public class GetFavoriteListResponse {

    @Schema(description = "총 개수", example = "8")
    private Long totalCnt;

    @Schema(description = "찜 정보")
    private List<GetFavoriteResponse> favorites;

    @Schema(description = "현재 페이지", example = "0")
    private Integer page;

    @Schema(description = "다음 페이지 존재 여부", example = "true")
    private Boolean hasNext;

    @Builder
    private GetFavoriteListResponse(Long totalCnt, List<GetFavoriteResponse> favorites, Integer page, Boolean hasNext) {
        this.totalCnt = totalCnt;
        this.favorites = favorites;
        this.page = page;
        this.hasNext = hasNext;
    }
}
