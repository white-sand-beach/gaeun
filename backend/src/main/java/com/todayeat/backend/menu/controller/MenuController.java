package com.todayeat.backend.menu.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.menu.dto.CreateMenuRequest;
import com.todayeat.backend.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menus")
public class MenuController implements MenuControllerDocs{

    private final MenuService menuService;

    @Override
    @PreAuthorize("hasRole('SELLER')")
    @PostMapping
    public SuccessResponse<Void> create(CreateMenuRequest request) {

        menuService.create(request);

        return SuccessResponse.of(SuccessType.CREATE_MENU_SUCCESS);
    }
}
