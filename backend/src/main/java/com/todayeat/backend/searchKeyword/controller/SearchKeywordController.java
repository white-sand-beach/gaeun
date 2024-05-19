package com.todayeat.backend.searchKeyword.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.searchKeyword.dto.response.GetPopularSearchListResponse;
import com.todayeat.backend.searchKeyword.dto.response.GetSuggestionSearchListResponse;
import com.todayeat.backend.searchKeyword.service.SearchKeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SearchKeywordController implements SearchKeywordControllerDocs {

    private final SearchKeywordService searchKeywordService;

    @Override
    public SuccessResponse<GetPopularSearchListResponse> getListToSeller() {

        return SuccessResponse.of(searchKeywordService.getTopKeywordsInLastHour(), SuccessType.GET_POPULAR_SEARCH_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<GetSuggestionSearchListResponse> getSearchSuggestions(String query) {

        return SuccessResponse.of(searchKeywordService.getSearchSuggestions(query), SuccessType.GET_SUGGESTION_SEARCH_LIST_SUCCESS);
    }
}

