package com.todayeat.backend.category.dto.response;

import com.todayeat.backend.category.dto.CategoryInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(description = "카테고리 목록 조회 응답")
public class GetCategoryListResponse {

    private List<CategoryInfo> categoryList;

    @Builder
    private GetCategoryListResponse(List<CategoryInfo> categoryList) {
        this.categoryList = categoryList;
    }

    static public GetCategoryListResponse of(List<CategoryInfo> categoryList) {
        return builder()
                .categoryList(categoryList)
                .build();
    }
}
