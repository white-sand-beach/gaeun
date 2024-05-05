package com.todayeat.backend.menu.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.menu.dto.CreateMenuRequest;
import com.todayeat.backend.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MenuController implements MenuControllerDocs{

    private final MenuService menuService;

    @Override
    public SuccessResponse<Void> create(CreateMenuRequest request) {

        menuService.create(request);

        return SuccessResponse.of(SuccessType.CREATE_MENU_SUCCESS);
    }
}
