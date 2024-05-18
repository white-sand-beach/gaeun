package com.todayeat.backend._common.notification.controller;

import com.todayeat.backend._common.notification.dto.response.GetConsumerNotificationCountResponse;
import com.todayeat.backend._common.notification.dto.response.GetConsumerNotificationListResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.sale.dto.response.GetSaleListSellerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "consumer-notifications", description = "소비자 알림")
@RequestMapping("/api/consumer-notifications")
public interface ConsumerNotificationControllerDocs {

    @Operation(summary = "소비자용 알림 목록 조회",
            description = """
                    `ROLE_CONSUMER` \n
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetConsumerNotificationListResponse.class)))
    @GetMapping()
    @PreAuthorize("hasRole('CONSUMER')")
    SuccessResponse<GetConsumerNotificationListResponse> getList(@Schema(description = "페이지 번호, 0부터 시작", example = "0")
                                                               @RequestParam
                                                               Integer page,
                                                                 @Schema(description = "데이터 개수", example = "10")
                                                               @RequestParam
                                                               Integer size);

    @Operation(summary = "소비자용 미알림 개수 조회",
            description = """
                    `ROLE_CONSUMER` \n
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetConsumerNotificationCountResponse.class)))
    @GetMapping("/count")
    @PreAuthorize("hasRole('CONSUMER')")
    SuccessResponse<GetConsumerNotificationCountResponse> getCount();

    @Operation(summary = "소비자용 알림 읽음 처리",
            description = """
                    `ROLE_CONSUMER` \n
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @PostMapping("/is-read-true/{consumer-notification-id}")
    @PreAuthorize("hasRole('CONSUMER')")
    SuccessResponse<Void> isReadTrue(@PathVariable(name = "consumer-notification-id")
                                     @Schema(description = "소비자 알림 ID", example = "1")
                                     Long consumerNotificationId);
}
