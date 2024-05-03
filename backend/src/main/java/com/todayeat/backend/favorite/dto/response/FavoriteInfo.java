package com.todayeat.backend.favorite.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "FavoriteInfo", description = "찜 정보")
public class FavoriteInfo {

    @Schema(description = "찜 고유번호", example = "1")
    private Long favoriteId;

    @Schema(description = "가게 고유번호", example = "1")
    private Long storeId;

    @Schema(description = "가게 이름", example = "동대문엽기떡볶이")
    private String storeName;

    @Schema(description = "가게 이미지 URL", example = "---")
    private String storeImageUrl;

    @Schema(description = "가게 찜 수", example = "4")
    private Integer storeFavoriteCnt;

    @Schema(description = "가게 리뷰 수", example = "3")
    private Integer storeReviewCnt;

    @Builder
    private FavoriteInfo(Long favoriteId, Long storeId, String storeName, String storeImageUrl, Integer storeFavoriteCnt, Integer storeReviewCnt) {
        this.favoriteId = favoriteId;
        this.storeId = storeId;
        this.storeName = storeName;
        this.storeImageUrl = storeImageUrl;
        this.storeFavoriteCnt = storeFavoriteCnt;
        this.storeReviewCnt = storeReviewCnt;
    }
}
