package com.todayeat.backend.order.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
@Schema(name = "ValidateOrderRequest", description = "주문 검증 요청")
public class ValidateOrderRequest {

    @NotBlank(message = "paymentId: 값이 비어 있지 않아야 합니다.")
    @Schema(description = "결제 고유번호", example = "234acd34")
    private String paymentId;
}
