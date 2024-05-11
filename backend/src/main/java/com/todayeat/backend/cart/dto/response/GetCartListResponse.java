package com.todayeat.backend.cart.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetCartListResponse", description = "장바구니 목록 조회")
public class GetCartListResponse {

    @Schema(description = "가게 ID", example = "2")
    private Long storeId;

    @Schema(description = "가게명", example = "옥이네")
    private String storeName;

    @Schema(description = "가게 오픈 여부", example = "true")
    private Boolean isOpened;

    List<GetCartResponse> cartResponseList;

    @Schema(description = "원가 총합", example = "20000")
    private Integer originalTotalPrice;

    @Schema(description = "할인 해주는 총가격", example = "4000")
    private Integer discountTotalPrice;

    @Schema(description = "할인가 총합", example = "16000")
    private Integer sellTotalPrice;

    @Builder
    private GetCartListResponse (Long storeId, String storeName, Boolean isOpened, List<GetCartResponse> cartResponseList, Integer originalTotalPrice, Integer discountTotalPrice, Integer sellTotalPrice) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.isOpened = isOpened;
        this.cartResponseList = cartResponseList;
        this.originalTotalPrice = originalTotalPrice;
        this.discountTotalPrice = discountTotalPrice;
        this.sellTotalPrice = sellTotalPrice;
    }

    public static GetCartListResponse of (Long storeId, String storeName, Boolean isOpened, List<GetCartResponse> cartResponseList, Integer originalTotalPrice, Integer discountTotalPrice, Integer sellTotalPrice) {

        return builder()
                .storeId(storeId)
                .storeName(storeName)
                .isOpened(isOpened)
                .cartResponseList(cartResponseList)
                .originalTotalPrice(originalTotalPrice)
                .discountTotalPrice(discountTotalPrice)
                .sellTotalPrice(sellTotalPrice)
                .build();
    }
}
