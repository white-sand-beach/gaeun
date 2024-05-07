package com.todayeat.backend.store.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Schema(name = "소비자 가게 조회 응답")
public class GetConsumerInfoStoreResponse {

    @Schema(description = "가게명", example = "가게")
    private String name;

    @Schema(description = "전화번호", example = "01012345678")
    private String tel;

    @Schema(description = "지번 주소", example = "OO시 OO구 OO동 OOO-OO")
    private String address;

    @Schema(description = "도로명 주소", example = "OO OO시 O로 OOO")
    private String roadAddress;

    @Schema(description = "위도", example = "36.936936")
    private BigDecimal latitude;

    @Schema(description = "경도", example = "124.816326")
    private BigDecimal longitude;

    @Schema(description = "영업중 여부", example = "false")
    private boolean isOpened;

    @Schema(description = "대표 이미지", example = "https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/store-image/img.png")
    private String imageURL;

    @Schema(description = "영업 시간", example = "00시 ~ 24시")
    private String operatingTime;

    @Schema(description = "리뷰 수", example = "0")
    private int reviewCnt;

    @Schema(description = "찜 수", example = "0")
    private int favoriteCnt;

    // todo 찜 여부
}
