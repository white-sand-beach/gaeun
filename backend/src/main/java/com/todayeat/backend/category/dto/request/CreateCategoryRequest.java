package com.todayeat.backend.category.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Schema(name = "카테고리 추가(관리자 용) 요청")
public class CreateCategoryRequest {

    @NotBlank(message = "name: 빈 값이 아니어야 합니다.")
    @Size(max = 10, message = "name: 최대 길이는 10자입니다.")
    @Schema(description = "카테고리 명", example = "카테고리")
    private String name;

    @NotNull(message = "image: 값이 null이 아니어야 합니다.")
    @Schema(description = "카테고리 이미지", example = "https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/store-image/img.png")
    private MultipartFile image;
}
