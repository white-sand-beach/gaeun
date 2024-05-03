package com.todayeat.backend.category.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryInfo {

    @Schema(description = "카테고리 아이디", example = "1")
    private Long id;

    @Schema(description = "카테고리 명", example = "카테고리")
    private String name;

    @Schema(description = "카테고리 이미지", example = "https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/store-image/img.png")
    private String imageURL;
}
