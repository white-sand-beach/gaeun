package com.todayeat.backend.review.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@Schema(name = "CreateReviewRequest", description = "리뷰 등록 요청")
public class CreateReviewRequest {

    @NotBlank(message = "content: 값이 비어 있지 않아야 합니다.")
    @Size(min = 5, message = "content: 길이가 5자 이상이여야 합니다.")
    @Schema(description = "리뷰 내용", example = "정말 맛있네요.")
    private String content;

    @Schema(description = "리뷰 이미지", example = "img.jpg")
    private MultipartFile image;

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;

    @NotNull(message = "OrderInfoId: 값이 null이 아니어야 합니다.")
    @Schema(description = "주문 ID", example = "1")
    private Long OrderInfoId;
}
