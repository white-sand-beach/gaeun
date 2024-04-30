package com.todayeat.backend._common.refreshtoken.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "reissue", description = "토큰 재발급")
@RequestMapping("/api/reissue")
public interface ReissueControllerDocs {

    @Operation(summary = "토큰 재발급",
            description = """
                          액세스 토큰이 만료되었을 때, 리프레시 토큰으로 토큰을 재발급합니다.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "401",
            description = "유효하지 않은 토큰",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping
    SuccessResponse<Void> reissueToken(HttpServletRequest request, HttpServletResponse response);
}
