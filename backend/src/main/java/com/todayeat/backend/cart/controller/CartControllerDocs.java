package com.todayeat.backend.cart.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.cart.dto.request.CreateCartRequest;
import com.todayeat.backend.cart.dto.request.UpdateQuantityRequest;
import com.todayeat.backend.cart.dto.response.GetCartListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@Tag(name = "carts", description = "장바구니")
@RequestMapping("/api/carts")
public interface CartControllerDocs {

    @Operation(summary = "장바구니 등록",
            description = """
                    `ROLE_CONSUMER` \n
                    request body 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "400",
            description = """
                    가게 존재 여부, 가게가 열려 있는지 확인 \n
                    장바구니에 다른 가게 음식이 담겨있는지 확인 \n
                    해당 가게에 판매 존재 여부, 판매 중지인지 확인 \n
                    수량이 남은 재고 보다 작거나 같은지 확인
                    """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping
    SuccessResponse<Void> create(@RequestBody @Valid CreateCartRequest request);

    @Operation(summary = "장바구니 조회",
            description = """
                    `ROLE_CONSUMER` \n
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetCartListResponse.class)))
    @GetMapping
    SuccessResponse<GetCartListResponse> getList();

    @Operation(summary = "장바구니 수량 변경",
            description = """
                    `ROLE_CONSUMER` \n
                    path variable로 cart-id 넣어주세요. \n
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "401",
            description = "내 장바구니가 맞는지 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "404",
            description = """ 
                    장바구니 존재 확인 \n
                    메뉴 정보 없음 \n
                    """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PutMapping(value = "/{cart-id}")
    SuccessResponse<Void> updateQuantity(@PathVariable(name = "cart-id")
                                         @Schema(description = "장바구니 ID", example = "1")
                                         String cartId,
                                         @RequestBody
                                         @Valid
                                         UpdateQuantityRequest request);

    @Operation(summary = "장바구니 삭제",
            description = """
                    `ROLE_CONSUMER` \n
                    path variable로 cart-id 넣어주세요. \n
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = "장바구니 존재 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "401",
            description = "내 장바구니가 맞는지 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @DeleteMapping("/{cart-id}")
    SuccessResponse<Void> delete(@PathVariable(name = "cart-id")
                                 @Schema(description = "장바구니 ID", example = "0018c673-a755-454f-9777-4b4d29fe5fb1")
                                 String cartId);

    @Operation(summary = "장바구니 전체 삭제",
            description = "`ROLE_CONSUMER`")
    @ApiResponse(responseCode = "200",
            description = "성공")
    @DeleteMapping
    SuccessResponse<Void> deleteAll();
}
