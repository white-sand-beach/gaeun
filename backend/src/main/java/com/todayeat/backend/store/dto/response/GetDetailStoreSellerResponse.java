package com.todayeat.backend.store.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Schema(name = "판매자 가게 상세 조회 응답")
public class GetDetailStoreSellerResponse {

    @Schema(description = "가게명", example = "가게")
    private String name;

    @Schema(description = "전화번호", example = "01012345678")
    private String tel;

    @Schema(description = "주소", example = "OO OO시 O로 OOO")
    private String address;

    @Schema(description = "위도", example = "36.936936")
    private BigDecimal latitude;

    @Schema(description = "경도", example = "124.816326")
    private BigDecimal longitude;

    @Schema(description = "영업중 여부", example = "false")
    private boolean isOpened;

    @Schema(description = "리뷰 수", example = "0")
    private int reviewCnt;

    @Schema(description = "찜 수", example = "0")
    private int favoriteCnt;
}
