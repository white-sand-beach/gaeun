package com.todayeat.backend._common.statistic.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetConsumerReceiptAllResponse {

    @Schema(description = "수령 된 총 구매량", example = "0")
    private Integer receiptAll;

    @Builder
    private GetConsumerReceiptAllResponse(Integer receiptAll) {
        this.receiptAll = receiptAll;
    }

    public static GetConsumerReceiptAllResponse of(Integer receiptAll) {
        return builder()
                .receiptAll(receiptAll)
                .build();
    }
}
