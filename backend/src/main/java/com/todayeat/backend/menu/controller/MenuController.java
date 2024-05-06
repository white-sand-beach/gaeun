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
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menus")
public class MenuController implements MenuControllerDocs {

    private final MenuService menuService;

    @Override
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public SuccessResponse<Void> create(@ModelAttribute CreateMenuRequest request) {

        menuService.create(request);

        return SuccessResponse.of(SuccessType.CREATE_MENU_SUCCESS);
    }

    @Override
    @GetMapping
    public SuccessResponse<GetMenusResponse> getMenusResponse(@RequestParam(required = true, name = "store-id")
                                                              Long storeId) {
        return SuccessResponse.of(menuService.getMenusResponse(storeId), SuccessType.GET_MENU_LIST_SUCCESS);
    }

    @Override
    @PutMapping(value = "/{menu-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public SuccessResponse<Void> update(@PathVariable(name = "menu-id") Long menuId,
                                        @ModelAttribute UpdateMenuRequest request) {

        menuService.update(menuId, request);

        return SuccessResponse.of(SuccessType.UPDATE_MENU_SUCCESS);
    }

    @Override
    @DeleteMapping("/{menu-id}")
    public SuccessResponse<Void> delete(@PathVariable(name = "menu-id") Long menuId,
                                        @RequestBody DeleteMenuRequest request) {

        menuService.delete(menuId, request);

        return SuccessResponse.of(SuccessType.DELETE_MENU_SUCCESS);
    }
}
