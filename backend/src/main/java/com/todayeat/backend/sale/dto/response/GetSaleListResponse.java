package com.todayeat.backend.sale.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetSaleListResponse {

    private Long storeId;

    private List<GetSaleResponse> saleList;

    private Integer size;

    @Builder
    private GetSaleListResponse(Long storeId, List<GetSaleResponse> saleList, Integer size) {
        this.storeId = storeId;
        this.saleList = saleList;
        this.size = size;
    }

    public static GetSaleListResponse of(Long storeId, List<GetSaleResponse> saleList, Integer size) {
        return builder()
                .storeId(storeId)
                .saleList(saleList)
                .size(size)
                .build();
    }
}
