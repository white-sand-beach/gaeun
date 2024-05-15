package com.todayeat.backend.order.api.dto.response;

import lombok.Getter;

@Getter
public class CancelPaymentResponse {

    private PaymentCancellation cancellation;

    @Getter
    public static class PaymentCancellation {
        String status;
        String id;
    }
}
