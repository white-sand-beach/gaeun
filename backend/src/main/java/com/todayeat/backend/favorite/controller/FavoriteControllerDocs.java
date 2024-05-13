package com.todayeat.backend.favorite.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.favorite.dto.request.CreateFavoriteRequest;
import com.todayeat.backend.favorite.dto.request.DeleteFavoriteRequest;
import com.todayeat.backend.favorite.dto.response.GetFavoriteListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@Tag(name = "favorites", description = "찜")
@RequestMapping("/api/favorites")
public interface FavoriteControllerDocs {

    @Operation(summary = "찜 등록",
            description = """
                          `ROLE_CONSUMER` \n
                          request body 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = "가게를 찾을 수 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "409",
            description = "이미 찜이 존재",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping
    SuccessResponse<Void> create(@RequestBody @Valid CreateFavoriteRequest request);

    @Operation(summary = "즐겨찾기 ID로 찜 삭제",
            description = """
                          `ROLE_CONSUMER` \n
                          path variable로 favorite-id 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = "찜을 찾을 수 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @DeleteMapping("/{favorite-id}")
    SuccessResponse<Void> deleteByFavoriteId(@PathVariable("favorite-id") Long favoriteId);

    @Operation(summary = "가게 ID로 찜 삭제",
            description = """
                          `ROLE_CONSUMER` \n
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = "가게를 찾을 수 없음 / 찜을 찾을 수 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @DeleteMapping
    SuccessResponse<Void> deleteByStoreId(@RequestBody @Valid DeleteFavoriteRequest request);

    @Operation(summary = "찜 목록 조회",
            description = """
                          `ROLE_CONSUMER` \n
                          query string으로 page, size 넣어주세요. \n
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetFavoriteListResponse.class)))
    @GetMapping
    SuccessResponse<GetFavoriteListResponse> getList(@Schema(description = "0부터 시작") @RequestParam Integer page,
                                                     @RequestParam Integer size);
}
