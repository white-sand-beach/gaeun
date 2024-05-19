package com.todayeat.backend.sale.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
@Schema(name = "UpdateSaleRequest", description = "판매 내용, 상태, 총 재고 수정 요청")
public class UpdateSaleRequest {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;

    @NotNull(message = "menuId: 값이 null이 아니어야 합니다.")
    @Schema(description = "메뉴 ID", example = "1")
    private Long menuId;

    @Schema(description = "판매 내용", example = "마라샹궈 맛있어요. 주의 건두부 없음.")
    private String content;

    @Schema(description = "판매 상태", example = "true: 판매 중지, false: 판매 중")
    private Boolean isFinished;

    @Positive(message = "stock: 값이 양수이어야 합니다.")
    @Schema(description = "판매 재고", example = "6")
    private Integer stock;
}
