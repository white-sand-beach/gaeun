package com.todayeat.backend.sale.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Schema(name = "UpdateSaleContentRequest", description = "판매 내용 수정 요청")
public class UpdateSaleContentRequest {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;

    @NotNull(message = "menuId: 값이 null이 아니어야 합니다.")
    @Schema(description = "메뉴 ID", example = "1")
    private Long menuId;

    @Schema(description = "판매 내용", example = "마라샹궈 맛있어요. 주의 건두부 없음.")
    private String content;
}
