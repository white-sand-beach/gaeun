package com.todayeat.backend.cart.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "GetCartResponse", description = "장바구니 조회")
public class GetCartResponse {

    @Schema(description = "장바구니 ID", example = "62cfa7eb-365d-46ab-97d7-1ad2063cb757")
    private String cartId;

    @Schema(description = "판매 ID", example = "2")
    private Long saleId;

    @Schema(description = "판매 이미지 url", example = "https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/seller/1/menu-image/uuid.png")
    private String imageUrl;

    @Schema(description = "판매 이름", example = "마라샹궈")
    private String saleName;

    @Schema(description = "판매 원가", example = "20000")
    private Integer originalPrice;

    @Schema(description = "판매 판매가", example = "16000")
    private Integer sellPrice;

    @Schema(description = "판매 할인율", example = "20")
    private Integer discountRate;

    @Schema(description = "판매 내용", example = "분모자 옥수수면 소고기")
    private String content;

    @Schema(description = "판매 남은 수량: 현재 장바구니 수량 미포함", example = "3")
    private Integer restStock;

    @Schema(description = "판매 종료 여부", example = "false")
    private Boolean isFinished; //죵료 여부

    @Schema(description = "담은 수량", example = "2")
    private Integer quantity;

    @Builder
    private GetCartResponse(String cartId, Long saleId, String imageUrl, String saleName, Integer originalPrice, Integer sellPrice, Integer discountRate, String content, Integer restStock, Boolean isFinished, Integer quantity) {
        this.cartId = cartId;
        this.saleId = saleId;
        this.imageUrl = imageUrl;
        this.saleName = saleName;
        this.originalPrice = originalPrice;
        this.sellPrice = sellPrice;
        this.discountRate = discountRate;
        this.content = content;
        this.restStock = restStock;
        this.isFinished = isFinished;
        this.quantity = quantity;
    }
}
