package com.todayeat.backend.order.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "CreateOrderResponse", description = "주문 등록 응답")
public class CreateOrderResponse {

    @Schema(description = "주문 ID, 결제 후 결제 검증 로직에 필요합니다.", example = "1")
    private Long orderInfoId;

    @Builder
    private CreateOrderResponse(Long orderInfoId) {
        this.orderInfoId = orderInfoId;
    }

    public static CreateOrderResponse of(Long orderInfoId) {
        return builder()
                .orderInfoId(orderInfoId)
                .build();
    }
}
