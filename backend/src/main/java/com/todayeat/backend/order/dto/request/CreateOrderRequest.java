package com.todayeat.backend.order.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "CreateOrderRequest", description = "주문 등록 요청")
public class CreateOrderRequest {

    @NotNull(message = "cartIdList: 값이 null이 아니어야 합니다.")
    @Schema(description = "장바구니 ID 목록", example = "[1, 2, 3]")
    private List<String> cartIdList;
}
