package com.todayeat.backend.menu.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.menu.dto.request.CreateMenuRequest;
import com.todayeat.backend.menu.dto.request.DeleteMenuRequest;
import com.todayeat.backend.menu.dto.request.UpdateMenuRequest;
import com.todayeat.backend.menu.dto.response.GetMenuListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@Tag(name = "menus", description = "메뉴")
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
            description = "판매자의 가게가 맞는지 확인, 가게 존재 여부 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "400",
            description = """
                    원가가 0인 경우 \n
                    판매가가 원가보다 큰 경우
                    """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    SuccessResponse<Void> create(@ModelAttribute @Valid CreateMenuRequest request);

    @Operation(summary = "메뉴 조회",
            description = """
                    `ROLE_SELLER` \n
                    요청 파라미터로 가게ID를 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetMenuListResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "판매자의 가게가 맞는지 확인, 가게 존재 여부 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @GetMapping
    SuccessResponse<GetMenuListResponse> getList(@RequestParam(required = true, name = "store-id")
                                                       @NotNull(message = "store-id: 값이 null이 아니어야 합니다.")
                                                       @Schema(description = "가게 ID", example = "1")
                                                       Long storeId);

    @Operation(summary = "메뉴 수정",
            description = """
                    `ROLE_SELLER` \n
                    path variable로 menu-id 넣어주세요. \n
                    request body 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = """ 
                    판매자의 가게가 맞는지 확인, 가게 존재 여부 확인 \n
                    메뉴 정보 없음 \n
                    """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PutMapping(value = "/{menu-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    SuccessResponse<Void> update(@PathVariable(name = "menu-id")
                                 @Schema(description = "메뉴 ID", example = "1")
                                 Long menuId,
                                 @ModelAttribute
                                 @Valid
                                 UpdateMenuRequest request);

    @Operation(summary = "메뉴 삭제",
            description = """
                    `ROLE_SELLER` \n
                    path variable로 menu-id 넣어주세요. \n
                    request body 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = """
                    판매자의 가게가 맞는지 확인, 가게 존재 여부 확인 \n
                    메뉴 정보 없음 \n
                    """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @DeleteMapping("/{menu-id}")
    SuccessResponse<Void> delete(@PathVariable(name = "menu-id")
                                 @Schema(description = "메뉴 ID", example = "1")
                                 Long menuId,
                                 @RequestBody
                                 @Valid
                                 DeleteMenuRequest request);
}
