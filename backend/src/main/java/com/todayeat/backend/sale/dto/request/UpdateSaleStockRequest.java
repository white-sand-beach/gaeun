package com.todayeat.backend.sale.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
@Schema(name = "UpdateSaleStockRequest", description = "판매 재고 수정 요청")
public class UpdateSaleStockRequest {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;

    @NotNull(message = "menuId: 값이 null이 아니어야 합니다.")
    @Schema(description = "메뉴 ID", example = "1")
    private Long menuId;

    @Positive(message = "stock: 값이 양수이어야 합니다.")
    @Schema(description = "판매 재고", example = "6")
    private Integer stock;
}
