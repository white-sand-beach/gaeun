package com.todayeat.backend.fcmtoken.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.fcmtoken.dto.request.CreateFCMTokenRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "fcmtokens", description = "fcm 토큰")
@RequestMapping("/api/fcmtokens")
public interface FCMTokenControllerDocs {

    @Operation(summary = "fcm 토큰 등록",
            description = "request body 넣어주세요.")
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "403",
            description = "유저가 seller나 consumer가 아닌 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping
    SuccessResponse<Void> create(@RequestBody @Valid CreateFCMTokenRequest request);
}
