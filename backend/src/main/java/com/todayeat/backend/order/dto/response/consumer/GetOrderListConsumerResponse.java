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

    @Schema(description = "현재 페이지", example = "0")
    private Integer page;

    @Schema(description = "다음 페이지 존재 여부", example = "true")
    private Boolean hasNext;

    @Builder
    private GetOrderListConsumerResponse(List<GetOrderConsumerResponse> orderInfoList, Integer page, Boolean hasNext) {
        this.orderInfoList = orderInfoList;
        this.page = page;
        this.hasNext = hasNext;
    }

    public static GetOrderListConsumerResponse of(List<GetOrderConsumerResponse> orderInfoList, Integer page, Boolean hasNext) {
        return builder()
                .orderInfoList(orderInfoList)
                .page(page)
                .hasNext(hasNext)
                .build();
    }
}
