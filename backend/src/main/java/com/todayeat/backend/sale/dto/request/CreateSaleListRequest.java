package com.todayeat.backend.sale.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "CreateSaleListRequest", description = "판매 목록 등록 요청")
public class CreateSaleListRequest {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 ID", example = "1")
    private Long storeId;

    private List<CreateSaleRequest> saleList;

    @Schema(description = "판매 목록 등록 요청 총 개수", example = "1")
    private Integer size;
}
