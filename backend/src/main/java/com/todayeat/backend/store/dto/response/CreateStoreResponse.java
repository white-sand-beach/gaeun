package com.todayeat.backend.store.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "가게 등록 응답")
public class CreateStoreResponse {

    @Schema(description = "가게 고유번호", example = "1")
    private Long storeId;
}
