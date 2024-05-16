package com.todayeat.backend.sale.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Schema(name = "UpdateSaleIsFinishedAllRequest", description = "모든 판매 종료 요청")
public class UpdateSaleIsFinishedAllRequest {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;
}
