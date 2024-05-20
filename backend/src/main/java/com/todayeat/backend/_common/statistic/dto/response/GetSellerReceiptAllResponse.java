package com.todayeat.backend._common.statistic.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "수령 된 총 판매량 응답")
public class GetSellerReceiptAllResponse {

    @Schema(description = "수령 된 총 판매량", example = "0")
    private Integer receiptAll;

    @Builder
    private GetSellerReceiptAllResponse(Integer receiptAll) {
        this.receiptAll = receiptAll;
    }

    public static GetSellerReceiptAllResponse of(Integer receiptAll) {
        return builder()
                .receiptAll(receiptAll)
                .build();
    }
}
