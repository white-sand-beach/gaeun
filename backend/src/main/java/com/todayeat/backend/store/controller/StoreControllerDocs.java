package com.todayeat.backend.store.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "가게 Controller")
@RequestMapping("/api/stores")
public interface StoreControllerDocs {

    @Operation(summary = "가게 등록")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @ApiResponse(responseCode = "409",
            description = "이미 존재하는 사업자 등록번호입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<Void> create(@ModelAttribute @Valid CreateStoreRequest createStoreRequest);

    @Operation(summary = "가게 수정")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 가게입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "401",
            description = "유효하지 않은 가게입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping(value = "/{store-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<Void> update(@PathVariable("store-id") Long storeId, @ModelAttribute @Valid UpdateStoreRequest updateStoreRequest);
}
