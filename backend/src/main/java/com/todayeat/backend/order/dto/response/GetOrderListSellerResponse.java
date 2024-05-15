package com.todayeat.backend.order.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetOrderListSellerResponse", description = "판매자 주문 목록 조회 응답")
public class GetOrderListSellerResponse {

    @Schema(description = "주문 정보")
    private List<GetOrderSellerResponse> orderInfo;

    @Builder
    private GetOrderListSellerResponse(List<GetOrderSellerResponse> orderInfo) {
        this.orderInfo = orderInfo;
    }

    public static GetOrderListSellerResponse of(List<GetOrderSellerResponse> orderInfo) {
        return builder()
                .orderInfo(orderInfo)
                .build();
    }
}
