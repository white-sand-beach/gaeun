package com.todayeat.backend.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetStoreSaleCountInfo {

    @Schema(description = "가게 고유번호", example = "1")
    private Long storeId;

    @Schema(description = "수령 횟수", example = "10")
    private Long  orderFinishedCnt;
}
