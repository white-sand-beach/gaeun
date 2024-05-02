package com.todayeat.backend.category.dto.response;

import com.todayeat.backend.category.dto.CategoryInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetCategoryListResponse {

    @Schema(description = "카테고리 목록", example = "{name: 카테고리1, image: https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/store-image/img1.png, name: 카테고리2, image: https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/store-image/img2.png}")
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
