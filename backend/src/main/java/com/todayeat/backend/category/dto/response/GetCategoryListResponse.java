package com.todayeat.backend.category.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class GetCategoryListResponse {

    private List<CategoryInfo> categoryList;

    @Getter
    @Setter
    public static class CategoryInfo {
        private String name;
        private String image;
    }

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
