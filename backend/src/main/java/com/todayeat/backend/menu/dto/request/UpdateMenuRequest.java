package com.todayeat.backend.menu.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@Schema(name = "UpdateMenuRequest", description = "메뉴 수정 요청")
public class UpdateMenuRequest {

    @Schema(description = "바꿀 메뉴 이미지", example = "img.jpg")
    private MultipartFile image;

    @NotBlank(message = "name: 값이 비어 있지 않아야 합니다.")
    @Size(max = 20, message = "name: 길이가 20 이하여야 합니다.")
    @Schema(description = "메뉴 이름", example = "마라샹궈")
    private String name;

    @NotNull(message = "originalPrice: 값이 null이 아니어야 합니다.")
    @Min(value = 1, message = "originalPrice: 값이 1 이상이어야 합니다.")
    @Schema(description = "메뉴 원가", example = "20000")
    private Integer originalPrice;

    @NotNull(message = "sellPrice: 값이 null이 아니어야 합니다.")
    @Min(value = 0, message = "sellPrice: 값이 0 이상이어야 합니다.")
    @Schema(description = "메뉴 판매가", example = "16000")
    private Integer sellPrice;

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;
}
