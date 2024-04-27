package com.todayeat.backend.seller.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.seller.dto.request.*;
import com.todayeat.backend.seller.dto.response.CheckEmailSellerResponse;
import com.todayeat.backend.seller.dto.response.CheckTempPasswordSellerResponse;
import com.todayeat.backend.seller.dto.response.FindEmailSellerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "판매자 auth Controller")
@RequestMapping("/api/auth")
public interface SellerAuthControllerDocs {

    @Operation(summary = "판매자 회원 가입")
    @ApiResponse(responseCode = "200", description = "성공", useReturnTypeSchema = true)
    @PostMapping()
    public SuccessResponse<Void> signup(@RequestBody @Valid SignupSellerRequest signupSellerRequest);

    @Operation(summary = "아이디(이메일) 사용 가능 여부 확인")
    @ApiResponse(responseCode = "200", description = "성공", useReturnTypeSchema = true)
    @PostMapping("/check-email")
    public SuccessResponse<CheckEmailSellerResponse> checkEmail(@RequestBody @Valid CheckEmailSellerRequest checkEmailSellerRequest);

    @Operation(summary = "전화번호로 아이디(이메일) 확인")
    @ApiResponse(responseCode = "200", description = "성공", useReturnTypeSchema = true)
    @PostMapping("/find-email")
    public SuccessResponse<FindEmailSellerResponse> fineEmail(@RequestBody @Valid FindEmailSellerRequest findEmailSellerRequest);

    @Operation(summary = "임시 비밀번호 생성")
    @ApiResponse(responseCode = "200", description = "성공", useReturnTypeSchema = true)
    @PostMapping("/get-temp-password")
    public SuccessResponse<Void> getTempPassword(@RequestBody @Valid GetTempPasswordSellerRequest getTempPasswordSellerRequest);

    @Operation(summary = "임시 비밀번호 확인")
    @ApiResponse(responseCode = "200", description = "성공", useReturnTypeSchema = true)
    @PostMapping("/check-temp-password")
    public SuccessResponse<CheckTempPasswordSellerResponse> checkTempPassword(@RequestBody @Valid CheckTempPasswordSellerRequest checkTempPasswordSellerRequest);
}
