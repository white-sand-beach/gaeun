package com.todayeat.backend.menu.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetMenuListResponse {

    private Long storeId;

    private List<GetMenuResponse> menus;

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
