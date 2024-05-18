package com.todayeat.backend.order.api.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CancelPaymentRequest {

    private String reason;

    @Builder
    private CancelPaymentRequest(String reason) {
        this.reason = reason;
    }

    public static CancelPaymentRequest of(String reason) {
        return builder()
                .reason(reason)
                .build();
    }
}
