package com.todayeat.backend.cart.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.cart.dto.request.CreateCartRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "carts", description = "장바구니")
@RequestMapping("/api/carts")
public interface CartControllerDocs {

    @Operation(summary = "장바구니 등록",
            description = """
                    `ROLE_SELLER` \n
                    request body 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "400",
            description = """
                    가게 존재 여부, 가게가 열려 있는지 확인 \n
                    해당 가게에 판매 존재 여부, 판매 중지인지 확인 \n
                    수량이 남은 재고 보다 작거나 같은지 확인
                    """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping
    SuccessResponse<Void> create(@RequestBody @Valid CreateCartRequest request);

}
