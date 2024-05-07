package com.todayeat.backend.menu.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "GetMenuResponse", description = "메뉴 조회")
public class GetMenuResponse {

    @Schema(description = "메뉴 ID", example = "1")
    private Long id;

    @Schema(description = "메뉴 이미지 url", example = "https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/menu-image/uuid.png")
    private String imageUrl;

    @Schema(description = "메뉴 이름", example = "마라샹궈")
    private String name;

    @Schema(description = "메뉴 원가", example = "20000")
    private Integer originalPrice;

    @Schema(description = "메뉴 판매가", example = "16000")
    private Integer sellPrice;

    @Schema(description = "메뉴 할인률", example = "20")
    private Integer discountRate;

    @Builder
    private GetMenuResponse(Long id, String imageUrl, String name, Integer originalPrice, Integer sellPrice, Integer discountRate) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;
        this.originalPrice = originalPrice;
        this.sellPrice = sellPrice;
        this.discountRate = discountRate;
    }
}
