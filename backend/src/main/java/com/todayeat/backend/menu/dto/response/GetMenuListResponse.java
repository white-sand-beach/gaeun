package com.todayeat.backend.menu.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetMenuListResponse {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;

    private List<GetMenuResponse> menus;

    @Schema(description = "메뉴 등록 총 개수", example = "1")
    private Integer size;

    @Builder
    private GetMenuListResponse(Long storeId, List<GetMenuResponse> menus, Integer size) {
        this.storeId = storeId;
        this.menus = menus;
        this.size = size;
    }

    public static GetMenuListResponse of(Long storeId, List<GetMenuResponse> menus, Integer size) {
        return builder()
                .storeId(storeId)
                .menus(menus)
                .size(size)
                .build();
    }
}
