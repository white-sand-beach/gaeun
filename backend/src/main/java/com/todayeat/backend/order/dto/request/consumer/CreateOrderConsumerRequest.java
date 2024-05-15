package com.todayeat.backend.order.dto.request.consumer;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "CreateOrderConsumerRequest", description = "주문 등록 요청")
public class CreateOrderConsumerRequest {

    @NotNull(message = "cartIdList: 값이 null이 아니어야 합니다.")
    @Schema(description = "장바구니 ID 목록", example = "[\"13413\", \"abcd2\", \"dfsf3d3\"]")
    private List<String> cartIdList;
}
