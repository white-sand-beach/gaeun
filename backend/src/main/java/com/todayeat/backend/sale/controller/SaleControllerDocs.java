package com.todayeat.backend.sale.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.sale.dto.request.CreateSaleListRequest;
import com.todayeat.backend.sale.dto.request.UpdateSaleStatusRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "sales", description = "판매")
@RequestMapping("/api/sales")
public interface SaleControllerDocs {

    @Operation(summary = "판매 등록",
            description = """
                    `ROLE_SELLER` \n
                    request body 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = """
            판매자의 가게가 맞는지 확인, 가게 존재 여부 확인 \n
            해당 메뉴의 존재 여부 확인 및 가게에 있는 메뉴인지 확인 \n
            """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "400",
            description = """
                    원가가 0인 경우 \n
                    판매가가 원가보다 큰 경우
                    """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<Void> create(@RequestBody @Valid CreateSaleListRequest request);

    @Operation(summary = "판매 상태 변경",
            description = """
                    `ROLE_SELLER` \n
                    path variable로 sale-id 넣어주세요. \n
                    request body 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = """ 
                    판매자의 가게가 맞는지 확인, 가게 존재 여부 확인 \n
                    해당 메뉴의 존재 여부 확인 및 가게에 있는 메뉴인지 확인 \n
                    """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "400",
            description = "해당 가게의 메뉴인 판매가 있는지 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PutMapping(value = "/{sale-id}/status")
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<Void> updateStatus(@PathVariable(name = "sale-id")
                                 @Schema(description = "판매 ID", example = "1")
                                 Long saleId,
                                 @RequestBody
                                 @Valid
                                 UpdateSaleStatusRequest request);
}
