package com.todayeat.backend.seller.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.seller.dto.request.UpdatePasswordSellerRequest;
import com.todayeat.backend.seller.dto.request.UpdatePhoneNumberSellerRequest;
import com.todayeat.backend.seller.dto.response.GetSellerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "판매자 Controller")
@RequestMapping("/api/sellers")
public interface SellerControllerDocs {

    @Operation(summary = "판매자 정보 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSellerResponse.class)))
    @GetMapping()
    SuccessResponse<GetSellerResponse> getInfo();

    @Operation(summary = "판매자 비밀번호 수정")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @ApiResponse(responseCode = "401",
            description = "비밀번호가 일치하지 않습니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PutMapping("/password")
    SuccessResponse<Void> updatePassword(UpdatePasswordSellerRequest updatePasswordSellerRequest);

    @Operation(summary = "판매자 전화번호 수정")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @PutMapping("/phone-number")
    SuccessResponse<Void> updatePhoneNumber(UpdatePhoneNumberSellerRequest updatePhoneNumberSellerRequest);
}
