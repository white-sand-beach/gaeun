package com.todayeat.backend._common.statistic.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.statistic.dto.response.GetConsumerReceiptAllResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerReceiptAllResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationWeekResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "통계 Controller")
@RequestMapping("/api/statistics")
public interface StatisticControllerDocs {

    @Operation(summary = "소비자 수령 된 총 구매량 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetConsumerReceiptAllResponse.class)))
    @GetMapping("/receipt/all")
    @PreAuthorize("hasRole('CONSUMER')")
    SuccessResponse<GetConsumerReceiptAllResponse> getConsumerReceiptAll();

    @Operation(summary = "판매자 수령 된 총 판매량 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSellerReceiptAllResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 가게입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @GetMapping("/{store-id}/receipt/all")
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<GetSellerReceiptAllResponse> getSellerReceiptAll(@PathVariable("store-id") Long storeId);

    @Operation(summary = "판매자 등록 된 주(오늘까지 7일간) 판매량 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSellerRegistrationWeekResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 가게입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @GetMapping("/{store-id}/registration/week")
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<GetSellerRegistrationWeekResponse> getSellerRegistrationWeek(@PathVariable("store-id") Long storeId);
}
