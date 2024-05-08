package com.todayeat.backend.sale.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
@Schema(name = "CreateSaleRequest", description = "판매 등록 요청")
public class CreateSaleRequest {

    @NotNull(message = "sellPrice: 값이 null이 아니어야 합니다.")
    @Min(value = 0, message = "sellPrice: 값이 0 이상이어야 합니다.")
    @Schema(description = "판매 판매가", example = "16000")
    private Integer sellPrice;

    @Schema(description = "판매 내용", example = "모기버섯은 없어요")
    private String content;

    @Schema(description = "판매 재고", example = "12")
    private Integer stock;

    @NotNull(message = "menuId: 값이 null이 아니어야 합니다.")
    @Schema(description = "메 ID", example = "1")
    private Long menuId;
}
