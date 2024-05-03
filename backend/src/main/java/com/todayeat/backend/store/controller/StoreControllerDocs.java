package com.todayeat.backend.store.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.GetConsumerDetailStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerInfoStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse;
import com.todayeat.backend.store.dto.response.GetSellerStoreResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "가게 Controller")
@RequestMapping("/api/stores")
public interface StoreControllerDocs {

    @Operation(summary = "가게 등록")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 카테고리입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<Void> create(@ModelAttribute @Valid CreateStoreRequest createStoreRequest);

    @Operation(summary = "판매자 가게 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSellerStoreResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 가게입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @GetMapping("/{store-id}")
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<GetSellerStoreResponse> getSellerStore(@PathVariable("store-id") Long storeId);

    @Operation(summary = "소비자 가게 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetConsumerInfoStoreResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 가게입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @GetMapping("/{store-id}/info")
    @PreAuthorize("hasRole('CONSUMER')")
    SuccessResponse<GetConsumerInfoStoreResponse> getConsumerInfoStore(@PathVariable("store-id") Long storeId);

    @Operation(summary = "소비자 가게 상세 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetConsumerDetailStoreResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 가게입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @GetMapping("/{store-id}/detail")
    @PreAuthorize("hasRole('CONSUMER')")
    SuccessResponse<GetConsumerDetailStoreResponse> getConsumerDetailStore(@PathVariable("store-id") Long storeId);

    @Operation(summary = "소비자 가게 목록 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetConsumerListStoreResponse.class)))
    @GetMapping()
    @PreAuthorize("hasRole('CONSUMER')")
    SuccessResponse<GetConsumerListStoreResponse> getConsumerListStore(@Schema(description = "검색어", example = "검색어") @RequestParam(required = false, name = "keyword") String keyword,
                                                                       @Schema(description = "카테고리 아이디", example = "1") @RequestParam(required = false, name = "category-id") Long categoryId,
                                                                       @Schema(description = "페이지 번호 (0부터 시작)", example = "0") @RequestParam(required = true, name = "page") Integer page,
                                                                       @Schema(description = "한 페이지에 불러올 데이터의 개수", example = "10") @RequestParam(required = true, name = "size") Integer size,
                                                                       @Schema(description = """
                                                                               정렬 조건
                                                                               - distance: 가까운 순
                                                                               - reviewCnt: 리뷰 많은 순
                                                                               - favoriteCnt: 찜 많은 순
                                                                               """, example = "near") @RequestParam(required = true, name = "sort") String sort);

    @Operation(summary = "가게 수정")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 가게입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PutMapping(value = "/{store-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<Void> update(@PathVariable("store-id") Long storeId, @ModelAttribute @Valid UpdateStoreRequest updateStoreRequest);

    @Operation(summary = "가게 영업 여부 수정")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema()))
    @ApiResponse(responseCode = "404",
            description = "존재하지 않는 가게입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PutMapping("/{store-id}/is-opened")
    @PreAuthorize("hasRole('SELLER')")
    SuccessResponse<Void> updateIsOpened(@PathVariable("store-id") Long storeId);
}
