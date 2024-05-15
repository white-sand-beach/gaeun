package com.todayeat.backend.order.dto.response.seller;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetOrderListInProgressSellerResponse", description = "판매자 진행 중인 주문 목록 조회 응답")
public class GetOrderListInProgressSellerResponse {

    @Schema(description = "주문 정보")
    private List<GetOrderInProgressSellerResponse> orderInfo;

    @Builder
    private GetOrderListInProgressSellerResponse(List<GetOrderInProgressSellerResponse> orderInfo) {
        this.orderInfo = orderInfo;
    }

    public static GetOrderListInProgressSellerResponse of(List<GetOrderInProgressSellerResponse> orderInfo) {
        return builder()
                .orderInfo(orderInfo)
                .build();
    }
}
