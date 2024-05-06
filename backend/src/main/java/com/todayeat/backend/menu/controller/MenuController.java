package com.todayeat.backend.menu.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.menu.dto.request.CreateMenuRequest;
import com.todayeat.backend.menu.dto.request.DeleteMenuRequest;
import com.todayeat.backend.menu.dto.request.UpdateMenuRequest;
import com.todayeat.backend.menu.dto.response.GetMenusResponse;
import com.todayeat.backend.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menus")
public class MenuController implements MenuControllerDocs{

    private final MenuService menuService;

    @Override
    @PreAuthorize("hasRole('SELLER')")
    @PostMapping
    public SuccessResponse<Void> create(@RequestBody CreateMenuRequest request) {

        menuService.create(request);

        return SuccessResponse.of(SuccessType.CREATE_MENU_SUCCESS);
    }

    @Override
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping
    public SuccessResponse<GetMenusResponse> getMenusResponse(@RequestParam(required = true, name = "store-id")
                                                              Long storeId) {
        return SuccessResponse.of(menuService.getMenusResponse(storeId), SuccessType.GET_MENU_LIST_SUCCESS);
    }

    @Override
    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/{menu-id}")
    public SuccessResponse<Void> update(@PathVariable(name = "menu-id") Long menuId,
                                        @RequestBody UpdateMenuRequest request) {

        menuService.update(menuId, request);

        return SuccessResponse.of(SuccessType.UPDATE_MENU_SUCCESS);
    }

    @Override
    @PreAuthorize("hasRole('SELLER')")
    @DeleteMapping("/{menu-id}")
    public SuccessResponse<Void> delete(@PathVariable(name = "menu-id") Long menuId,
                                        @RequestBody DeleteMenuRequest request) {

        menuService.delete(menuId, request);

        return SuccessResponse.of(SuccessType.DELETE_MENU_SUCCESS);
    }
}
