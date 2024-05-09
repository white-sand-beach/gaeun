package com.todayeat.backend.consumer.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.consumer.dto.request.CheckNicknameRequest;
import com.todayeat.backend.consumer.dto.request.UpdateConsumerRequest;
import com.todayeat.backend.consumer.dto.response.CheckNicknameResponse;
import com.todayeat.backend.consumer.dto.response.GetConsumerProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@Tag(name = "consumers", description = "소비자")
@RequestMapping("/api/consumers")
public interface ConsumerControllerDocs {

    @Operation(summary = "회원 정보 수정",
            description = """
                          `ROLE_CONSUMER` \n
                          사용자의 닉네임, 휴대폰 번호를 수정합니다. \n
                          request body 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
                description = "성공")
    @ApiResponse(responseCode = "409",
                description = "닉네임 중복",
                content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PutMapping
    SuccessResponse<Void> update(@RequestBody @Valid UpdateConsumerRequest request);

    @Operation(summary = "닉네임 중복 확인",
            description = """
                          `ROLE_CONSUMER` \n
                          사용자 닉네임의 중복 여부를 확인합니다. \n
                          request body 넣어주세요. \n
                          isValid 값을 반환합니다. (true이면 사용 가능)
                          """)
    @ApiResponse(responseCode = "200",
                description = "성공",
                content = @Content(schema = @Schema(implementation = CheckNicknameResponse.class)))
    @PostMapping("/check-nickname")
    SuccessResponse<CheckNicknameResponse> checkNickname(@RequestBody @Valid CheckNicknameRequest request);

    @Operation(summary = "프로필 정보 조회",
            description = """
                          `ROLE_CONSUMER`
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetConsumerProfileResponse.class)))
    @GetMapping("/profile")
    SuccessResponse<GetConsumerProfileResponse> getProfile();

    @Operation(summary = "로그아웃",
            description = """
                          `ROLE_CONSUMER`
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @GetMapping("/logout")
    SuccessResponse<Void> logout(HttpServletRequest request, HttpServletResponse response);
}
