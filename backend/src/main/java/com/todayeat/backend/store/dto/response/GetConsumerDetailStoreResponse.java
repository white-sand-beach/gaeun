package com.todayeat.backend.store.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "소비자 가게 상세 조회 응답")
public class GetConsumerDetailStoreResponse {

    @Schema(description = "상호명", example = "상호")
    private String registeredName;

    @Schema(description = "대표자명", example = "대표자")
    private String bossName;

    @Schema(description = "지번 주소", example = "OO시 OO구 OO동 OOO-OO")
    private String address;

    @Schema(description = "도로명 주소", example = "OO OO시 O로 OOO")
    private String roadAddress;

    @Schema(description = "전화번호", example = "01012345678")
    private String tel;

    @Schema(description = "가게명", example = "가게")
    private String name;

    @Schema(description = "영업 시간", example = "00시 ~ 24시")
    private String operatingTime;

    @Schema(description = "휴무일", example = "연중무휴")
    private String holiday;

    @Schema(description = "원산지", example = "국산")
    private String originCountry;

    @Schema(description = "소개", example = "방씀다")
    private String introduction;
}
