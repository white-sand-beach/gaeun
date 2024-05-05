package com.todayeat.backend.menu.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.menu.dto.CreateMenuRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "menus", description = "가게 메뉴")
@RequestMapping("/api/menus")
public interface MenuControllerDocs {

    @Operation(summary = "메뉴 등록",
            description = """
                          `ROLE_SELLER` \n
                          request body 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = "판매자의 가게가 맞는지 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping
    SuccessResponse<Void> create(@RequestBody @Valid CreateMenuRequest request);
}
