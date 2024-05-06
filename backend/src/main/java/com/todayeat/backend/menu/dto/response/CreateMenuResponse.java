package com.todayeat.backend.menu.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "CreateMenuResponse", description = "메뉴 등록 응답")
public class CreateMenuResponse {

    @Schema(description = "메뉴 고유번호", example = "1")
    private Long menuId;

    @Builder
    private CreateMenuResponse(Long menuId) {
        this.menuId = menuId;
    }

    public static CreateMenuResponse of(Long menuId) {
        return builder()
                .menuId(menuId)
                .build();
    }
}
