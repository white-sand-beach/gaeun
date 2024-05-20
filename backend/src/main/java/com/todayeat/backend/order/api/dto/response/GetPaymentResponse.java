package com.todayeat.backend.order.api.dto.response;

import lombok.Getter;

@Getter
public class GetPaymentResponse {

    private String status;
    private String id;
    private PaymentAmount amount;

    @Getter
    public static class PaymentAmount {
        private Integer total;
    }
}
