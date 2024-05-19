package com.todayeat.backend.order.dto.response;

import com.todayeat.backend.order.entity.OrderInfoItem;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "GetOrderInfoItemResponse", description = "주문 아이템 조회 응답")
public class GetOrderInfoItemResponse {

    @Schema(description = "음식 이름", example = "마라샹궈")
    private String name;

    @Schema(description = "수량", example = "1")
    private Integer quantity;

    @Schema(description = "판매 가격", example = "10000")
    private Integer sellPrice;

    @Builder
    private GetOrderInfoItemResponse(String name, Integer quantity, Integer sellPrice) {
        this.name = name;
        this.quantity = quantity;
        this.sellPrice = sellPrice;
    }

    public static GetOrderInfoItemResponse from(OrderInfoItem item) {

        return builder()
                .name(item.getName())
                .quantity(item.getQuantity())
                .sellPrice(item.getSellPrice())
                .build();
    }
}
