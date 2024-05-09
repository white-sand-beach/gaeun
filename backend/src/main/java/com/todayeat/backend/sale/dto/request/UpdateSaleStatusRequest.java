package com.todayeat.backend.sale.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Schema(name = "UpdateSaleStatusRequest", description = "판매 상태 수정 요청")
public class UpdateSaleStatusRequest {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;

    @NotNull(message = "menuId: 값이 null이 아니어야 합니다.")
    @Schema(description = "메뉴 ID", example = "1")
    private Long menuId;
}
