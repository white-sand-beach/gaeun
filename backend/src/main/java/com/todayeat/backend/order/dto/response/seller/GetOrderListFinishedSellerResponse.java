package com.todayeat.backend.order.dto.response.seller;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetOrderListFinishedSellerResponse", description = "판매자 진행 중인 주문 목록 조회 응답")
public class GetOrderListFinishedSellerResponse {

    @Schema(description = "주문 정보")
    private List<GetOrderFinishedSellerResponse> orderInfo;

    @Builder
    private GetOrderListFinishedSellerResponse(List<GetOrderFinishedSellerResponse> orderInfo) {
        this.orderInfo = orderInfo;
    }

    public static GetOrderListFinishedSellerResponse of(List<GetOrderFinishedSellerResponse> orderInfo) {
        return builder()
                .orderInfo(orderInfo)
                .build();
    }
}