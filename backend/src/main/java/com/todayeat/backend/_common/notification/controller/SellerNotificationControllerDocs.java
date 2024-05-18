package com.todayeat.backend._common.notification.controller;

import com.todayeat.backend._common.notification.dto.response.GetSellerNotificationCountResponse;
import com.todayeat.backend._common.notification.dto.response.GetSellerNotificationListResponse;
import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.sale.dto.response.GetSaleListSellerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "seller-notifications", description = "판매자 알림")
@RequestMapping("/api/seller-notifications")
public interface SellerNotificationControllerDocs {

    @Operation(summary = "판매자용 알림 목록 조회",
            description = """
                    `ROLE_SELLER` \n
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSaleListSellerResponse.class)))
    @GetMapping()
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<GetSellerNotificationListResponse> getList(@Schema(description = "페이지 번호, 0부터 시작", example = "0")
                                                               @RequestParam
                                                               Integer page,
                                                               @Schema(description = "데이터 개수", example = "10")
                                                               @RequestParam
                                                               Integer size);

    @Operation(summary = "판매자용 미알림 개수 조회",
            description = """
                    `ROLE_SELLER` \n
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSaleListSellerResponse.class)))
    @GetMapping("/count")
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<GetSellerNotificationCountResponse> getCount();
}
