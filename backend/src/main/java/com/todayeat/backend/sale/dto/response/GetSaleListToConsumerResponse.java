package com.todayeat.backend.sale.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetSaleListToConsumerResponse", description = "소비자용 판매 목록 조회")
public class GetSaleListToConsumerResponse {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;

    private List<GetSaleToConsumerResponse> saleList;

    @Schema(description = "판매자용 판매 등록 응답 총 개수", example = "1")
    private Integer size;

    @Builder
    private GetSaleListToConsumerResponse(Long storeId, List<GetSaleToConsumerResponse> saleList, Integer size) {
        this.storeId = storeId;
        this.saleList = saleList;
        this.size = size;
    }

    public static GetSaleListToConsumerResponse of(Long storeId, List<GetSaleToConsumerResponse> saleList, Integer size) {
        return builder()
                .storeId(storeId)
                .saleList(saleList)
                .size(size)
                .build();
    }
}
