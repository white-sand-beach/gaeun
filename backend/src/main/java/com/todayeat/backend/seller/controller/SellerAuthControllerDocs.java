package com.todayeat.backend.seller.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.seller.dto.request.*;
import com.todayeat.backend.seller.dto.response.CheckEmailSellerResponse;
import com.todayeat.backend.seller.dto.response.CheckRegisteredNoSellerResponse;
import com.todayeat.backend.seller.dto.response.CheckTempPasswordSellerResponse;
import com.todayeat.backend.seller.dto.response.FindEmailSellerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "판매자 auth Controller")
@RequestMapping("/api/auth")
public interface SellerAuthControllerDocs {

    @Operation(summary = "판매자 회원 가입")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @ApiResponse(responseCode = "409",
            description = "이미 존재하는 이메일입니다. / 이미 존재하는 사업자 등록번호입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping()
    SuccessResponse<Void> signup(@RequestBody @Valid SignupSellerRequest signupSellerRequest);

    @Operation(summary = "판매자 아이디(이메일) 사용 가능 여부 확인")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = CheckEmailSellerResponse.class)))
    @PostMapping("/check-email")
    SuccessResponse<CheckEmailSellerResponse> checkEmail(@RequestBody @Valid CheckEmailSellerRequest checkEmailSellerRequest);

    @Operation(summary = "판매자 사업자 등록번호 사용 가능 여부 확인")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = CheckRegisteredNoSellerResponse.class)))
    @PostMapping("/check-registered-no")
    SuccessResponse<CheckRegisteredNoSellerResponse> checkRegisteredNo(@RequestBody @Valid CheckRegisteredNoSellerRequest checkRegisteredNoSellerRequest);

    @Operation(summary = "판매자 전화번호로 아이디(이메일) 확인")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = FindEmailSellerResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 전화번호입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping("/find-email")
    SuccessResponse<FindEmailSellerResponse> fineEmail(@RequestBody @Valid FindEmailSellerRequest findEmailSellerRequest);

    @Operation(summary = "판매자 임시 비밀번호 생성")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @ApiResponse(responseCode = "401",
            description = "이메일이 일치하지 않습니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "500",
            description = "메일 전송에 실패했습니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping("/get-temp-password")
    SuccessResponse<Void> createTempPassword(@RequestBody @Valid CreateTempPasswordSellerRequest createTempPasswordSellerRequest);

    @Operation(summary = "판매자 임시 비밀번호 확인")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = CheckTempPasswordSellerResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 이메일입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 임시 비밀번호입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping("/check-temp-password")
    SuccessResponse<CheckTempPasswordSellerResponse> checkTempPassword(@RequestBody @Valid CheckTempPasswordSellerRequest checkTempPasswordSellerRequest);

    @Operation(summary = "판매자 로그아웃")
    @ApiResponse(responseCode = "200",
            description = "성공")
    @GetMapping("/logout")
    SuccessResponse<Void> logout(HttpServletRequest request, HttpServletResponse response);
}
