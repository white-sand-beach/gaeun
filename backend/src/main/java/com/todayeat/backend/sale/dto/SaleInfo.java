package com.todayeat.backend.sale.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleInfo {

    @Schema(description = "판매 이름", example = "판매")
    private String name;
}
