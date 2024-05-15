package com.todayeat.backend.sale.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.menu.dto.response.GetMenuListResponse;
import com.todayeat.backend.sale.dto.request.*;
import com.todayeat.backend.sale.dto.response.GetSaleDetailConsumerResponse;
import com.todayeat.backend.sale.dto.response.GetSaleListConsumerResponse;
import com.todayeat.backend.sale.dto.response.GetSaleListSellerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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

    @Operation(summary = "소비자용 판매 조회",
            description = """
                    `ROLE_CONSUMER` \n
                    요청 파라미터로 가게ID를 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSaleListConsumerResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "가게 존재 여부 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @GetMapping("/consumer")
    @PreAuthorize("hasRole('CONSUMER')")
    SuccessResponse<GetSaleListConsumerResponse> getListToConsumer(@RequestParam(required = true, name = "store-id")
                                                             @NotNull(message = "store-id: 값이 null이 아니어야 합니다.")
                                                             @Schema(description = "가게 ID", example = "1")
                                                             Long storeId);

    @Operation(summary = "소비자용 판매 상세 조회",
            description = """
                    `ROLE_CONSUMER` \n
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSaleDetailConsumerResponse.class)))
    @GetMapping("/{sale-id}/consumer")
    @PreAuthorize("hasRole('CONSUMER')")
    SuccessResponse<GetSaleDetailConsumerResponse> getDetailToConsumer(@PathVariable(name = "sale-id")
                                                                     @Schema(description = "판매 ID", example = "1")
                                                                     Long saleId);

    @Operation(summary = "판매자용 판매 조회",
            description = """
                    `ROLE_SELLER` \n
                    요청 파라미터로 가게ID를 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSaleListSellerResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "가게 존재 여부 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @GetMapping("/seller")
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<GetSaleListSellerResponse> getListToSeller(@RequestParam(required = true, name = "store-id")
                                                                 @NotNull(message = "store-id: 값이 null이 아니어야 합니다.")
                                                                 @Schema(description = "가게 ID", example = "1")
                                                                 Long storeId);
    @Operation(summary = "판매 수정",
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
                    재고가 판매량보다 크거나 같은지 확인
                    """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "400",
            description = "해당 가게의 메뉴인 판매가 있는지 확인",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PutMapping(value = "/{sale-id}")
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<Void> update(@PathVariable(name = "sale-id")
                                       @Schema(description = "판매 ID", example = "1")
                                       Long saleId,
                                       @RequestBody
                                       @Valid
                                       UpdateSaleRequest request);
}
