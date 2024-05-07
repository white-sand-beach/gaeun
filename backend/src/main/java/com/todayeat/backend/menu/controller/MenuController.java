package com.todayeat.backend.menu.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.menu.dto.request.CreateMenuRequest;
import com.todayeat.backend.menu.dto.request.DeleteMenuRequest;
import com.todayeat.backend.menu.dto.request.UpdateMenuRequest;
import com.todayeat.backend.menu.dto.response.GetMenuListResponse;
import com.todayeat.backend.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MenuController implements MenuControllerDocs {

    private final MenuService menuService;

    @Override
    public SuccessResponse<Void> create(CreateMenuRequest request) {

        menuService.create(request);

        return SuccessResponse.of(SuccessType.CREATE_MENU_SUCCESS);
    }

    @Override
    public SuccessResponse<GetMenuListResponse> getMenusResponse(Long storeId) {
        return SuccessResponse.of(menuService.getMenusResponse(storeId), SuccessType.GET_MENU_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> update(Long menuId, UpdateMenuRequest request) {

        menuService.update(menuId, request);

        return SuccessResponse.of(SuccessType.UPDATE_MENU_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> delete(Long menuId, DeleteMenuRequest request) {

        menuService.delete(menuId, request);

        return SuccessResponse.of(SuccessType.DELETE_MENU_SUCCESS);
    }
}
