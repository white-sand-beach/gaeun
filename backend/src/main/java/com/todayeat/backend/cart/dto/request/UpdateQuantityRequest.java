package com.todayeat.backend.cart.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Schema(name = "UpdateQuantityRequest", description = "장바구니 수량 변경 요청")
public class UpdateQuantityRequest {

    @NotNull(message = "quantity: 값이 null이 아니어야 합니다.")
    @Min(value = 1, message = "quantity: 값이 1 이상이어야 합니다.")
    @Schema(description = "변경 수량", example = "2")
    private Integer quantity;

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;

    @NotNull(message = "saleId: 값이 null이 아니어야 합니다.")
    @Schema(description = "메뉴 ID", example = "2")
    private Long saleId;
}
