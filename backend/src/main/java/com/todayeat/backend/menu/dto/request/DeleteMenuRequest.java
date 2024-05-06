package com.todayeat.backend.menu.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
@Schema(name = "DeleteMenuRequest", description = "메뉴 삭제 요청")
public class DeleteMenuRequest {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Positive(message = "storeId: 값이 양수여야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;
}
