package com.todayeat.backend.category.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.category.dto.request.CreateCategoryRequest;
import com.todayeat.backend.category.dto.response.GetCategoryListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "카테고리 Controller")
@RequestMapping("/api/categories")
public interface CategoryControllerDocs {

    @Operation(summary = "카테고리 추가(관리자 용)")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @ApiResponse(responseCode = "409",
            description = "이미 존재하는 카테고리입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    SuccessResponse<Void> create(@ModelAttribute @Valid CreateCategoryRequest createCategoryRequest);

    @Operation(summary = "카테고리 목록 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetCategoryListResponse.class)))
    @GetMapping()
    SuccessResponse<GetCategoryListResponse> get();
}
