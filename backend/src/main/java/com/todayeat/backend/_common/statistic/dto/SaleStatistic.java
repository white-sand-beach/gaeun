package com.todayeat.backend._common.statistic.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleStatistic {

    @Schema(description = "메뉴 이름", example = "0")
    private String menuName;

    @Schema(description = "판매량", example = "0")
    private Integer saleStatistic;
}
