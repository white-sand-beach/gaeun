package com.todayeat.backend._common.statistic.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Schema(name = "판매자 등록 된 주(오늘까지 7일간) 판매량 조회 응답")
public class GetSellerRegistrationWeekResponse {

    private List<SaleStatistic> saleStatisticList;

    @Getter
    @Setter
    public static class SaleStatistic {

        @Schema(description = "메뉴 이름", example = "0")
        private String menuName;

        @Schema(description = "판매량", example = "0")
        private Integer saleStatistic;
    }

    @Builder
    private GetSellerRegistrationWeekResponse(List<SaleStatistic> saleStatisticList) {

        this.saleStatisticList = saleStatisticList;
    }

    public static GetSellerRegistrationWeekResponse of(List<SaleStatistic> saleStatisticList) {

        return builder()
                .saleStatisticList(saleStatisticList)
                .build();
    }
}
