package com.todayeat.backend.searchKeyword.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.searchKeyword.dto.response.GetPopularSearchListResponse;
import com.todayeat.backend.searchKeyword.dto.response.GetSuggestionSearchListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "인기 검색어 Controller")
@RequestMapping("/api/search-keywords")
public interface SearchKeywordControllerDocs {

    @Operation(summary = "인기 검색어 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetPopularSearchListResponse.class)))
    @GetMapping()
    SuccessResponse<GetPopularSearchListResponse> getListToSeller();

    @Operation(summary = "추천 검색어 조회")
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetSuggestionSearchListResponse.class)))
    @GetMapping("/suggestions")
    SuccessResponse<GetSuggestionSearchListResponse> getSearchSuggestions(@RequestParam String query);
}
