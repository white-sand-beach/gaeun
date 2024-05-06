package com.todayeat.backend.menu.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.menu.dto.request.CreateMenuRequest;
import com.todayeat.backend.menu.dto.request.DeleteMenuRequest;
import com.todayeat.backend.menu.dto.request.UpdateMenuRequest;
import com.todayeat.backend.menu.dto.response.CreateMenuResponse;
import com.todayeat.backend.menu.dto.response.GetMenusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Tag(name = "menus", description = "메뉴")
public interface MenuControllerDocs {

    @Operation(summary = "메뉴 등록",
            description = """
                          `ROLE_SELLER` \n
                          request body 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = CreateMenuResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "판매자의 가게가 맞는지 확인, 가게 존재 여부 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "400",
            description = """
                          원가가 0인 경우 \n
                          판매가가 원가보다 큰 경우
                          """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    SuccessResponse<CreateMenuResponse> create(@Valid CreateMenuRequest request);

    @Operation(summary = "메뉴 조회",
            description = """
                          `ROLE_SELLER` \n
                          요청 파라미터로 가게ID를 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetMenusResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "판매자의 가게가 맞는지 확인, 가게 존재 여부 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    SuccessResponse<GetMenusResponse> getMenusResponse(@NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
                                                       @Positive(message = "storeId: 값이 양수여야 합니다.")
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
    SuccessResponse<Void> update(@Positive(message = "menuId: 값이 양수여야 합니다.")
                                 @Schema(description = "메뉴 ID", example = "1")
                                 Long menuId,
                                 @Valid UpdateMenuRequest request);

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
    SuccessResponse<Void> delete(@Positive(message = "menuId: 값이 양수여야 합니다.")
                                 @Schema(description = "메뉴 ID", example = "1")
                                 Long menuId,
                                 @Valid DeleteMenuRequest request);
}
