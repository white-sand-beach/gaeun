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

    @Schema(description = "현재 페이지", example = "0")
    private Integer page;

    @Schema(description = "다음 페이지 존재 여부", example = "true")
    private Boolean hasNext;

    @Builder
    private GetOrderListFinishedSellerResponse(List<GetOrderFinishedSellerResponse> orderInfo, Integer page, Boolean hasNext) {
        this.orderInfo = orderInfo;
        this.page = page;
        this.hasNext = hasNext;
    }

    public static GetOrderListFinishedSellerResponse of(List<GetOrderFinishedSellerResponse> orderInfo, Integer page, Boolean hasNext) {
        return builder()
                .orderInfo(orderInfo)
                .page(page)
                .hasNext(hasNext)
                .build();
    }
}