package com.todayeat.backend.store.dto.response;

import com.todayeat.backend.category.dto.CategoryInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Schema(name = "소비자 가게 목록 조회 응답")
public class GetConsumerListStoreResponse {

    private List<StoreInfo> storeList;

    @Schema(description = "현재 페이지", example = "0")
    private Integer page;

    @Schema(description = "다음 페이지 존재 여부", example = "true")
    private Boolean hasNext;

    @Getter
    @Setter
    public static class StoreInfo {

        @Schema(description = "가게 아이디", example = "1")
        private Long storeId;

        @Schema(description = "지번 주소", example = "OO시 OO구 OO동 OOO-OO")
        private String address;

        @Schema(description = "도로명 주소", example = "OO OO시 O로 OOO")
        private String roadAddress;

        @Schema(description = "위도", example = "36.936936")
        private BigDecimal latitude;

        @Schema(description = "경도", example = "124.816326")
        private BigDecimal longitude;

        @Schema(description = "가게 명", example = "가게")
        private String name;

        @Schema(description = "영업 시간", example = "00시 ~ 24시")
        private String operatingTime;

        @Schema(description = "리뷰 수", example = "0")
        private Integer reviewCnt;

        @Schema(description = "찜 수", example = "0")
        private Integer favoriteCnt;

        @Schema(description = "해당 위치와 거리", example = "1500")
        private Integer distance;

        @Schema(description = "카테고리 목록", example = "{name: 카테고리1, image: https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/store-image/img1.png, name: 카테고리2, image: https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/store-image/img2.png}")
        private List<CategoryInfo> categoryList;

        // todo 메뉴 리스트 추가 해야 함
    }

    @Builder
    private GetConsumerListStoreResponse(List<StoreInfo> storeList, Integer page, Boolean hasNext) {
        this.storeList = storeList;
        this.page = page;
        this.hasNext = hasNext;
    }

    static public GetConsumerListStoreResponse of(List<StoreInfo> storeList, Integer page, Boolean hasNext) {
        return builder()
                .storeList(storeList)
                .page(page)
                .hasNext(hasNext)
                .build();
    }
}
