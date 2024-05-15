package com.todayeat.backend.order.dto.response.consumer;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetOrderListConsumerResponse", description = "소비자 주문 목록 조회 응답")
public class GetOrderListConsumerResponse {

    @Schema(description = "주문 정보")
    private List<GetOrderConsumerResponse> orderInfoList;

    @Builder
    private GetOrderListConsumerResponse(List<GetOrderConsumerResponse> orderInfoList) {
        this.orderInfoList = orderInfoList;
    }

    public static GetOrderListConsumerResponse of(List<GetOrderConsumerResponse> orderInfoList) {
        return builder()
                .orderInfoList(orderInfoList)
                .build();
    }
}
