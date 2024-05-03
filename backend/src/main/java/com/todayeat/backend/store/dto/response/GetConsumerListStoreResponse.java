package com.todayeat.backend.store.dto.response;

import com.todayeat.backend.category.dto.CategoryInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Schema(name = "소비자 가게 목록 조회 응답")
public class GetConsumerListStoreResponse {

    private List<StoreInfo> storeList;

    @Getter
    @Setter
    public static class StoreInfo {

        @Schema(description = "가게 아이디", example = "1")
        private Long id;

        @Schema(description = "주소", example = "OO OO시 O로 OOO")
        private String address;

        @Schema(description = "가게 명", example = "가게")
        private String name;

        @Schema(description = "영업 시간", example = "00시 ~ 24시")
        private String operatingTime;

        @Schema(description = "리뷰 수", example = "0")
        private int reviewCnt;

        @Schema(description = "찜 수", example = "0")
        private int favoriteCnt;

        @Schema(description = "해당 위치와 거리", example = "1500")
        private Double distance;

        @Schema(description = "카테고리 목록", example = "{name: 카테고리1, image: https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/store-image/img1.png, name: 카테고리2, image: https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/store-image/img2.png}")
        private List<CategoryInfo> categoryList;

        // todo 메뉴 리스트 추가 해야 함
    }

    @Builder
    public GetConsumerListStoreResponse(List<StoreInfo> storeList) {
        this.storeList = storeList;
    }

    static public GetConsumerListStoreResponse of(List<StoreInfo> storeList) {
        return builder()
                .storeList(storeList)
                .build();
    }
}
