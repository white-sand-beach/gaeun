package com.todayeat.backend.searchKeyword.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Schema(name = "인기 검색어 조회 응답")
@NoArgsConstructor
public class GetPopularSearchListResponse {

    private List<KeywordInfo> keywordInfoList;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class KeywordInfo {

        @Schema(description = "인기 검색어", example = "검색어")
        private String keyword;

        @Builder
        private KeywordInfo(String keyword) {
            this.keyword = keyword;
        }

        public static KeywordInfo of(String keyword) {
            return builder()
                    .keyword(keyword)
                    .build();
        }
    }

    @Builder
    private GetPopularSearchListResponse(List<KeywordInfo> keywordInfoList) {
        this.keywordInfoList = keywordInfoList;
    }

    public static GetPopularSearchListResponse of(List<KeywordInfo> keywordInfoList) {
        return builder()
                .keywordInfoList(keywordInfoList)
                .build();
    }
}
