package com.todayeat.backend.favorite.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Schema(name = "CreateFavoriteRequest", description = "찜 등록 요청")
public class CreateFavoriteRequest {

    @NotNull(message = "storeId: 값이 null이 아니어야 합니다.")
    @Schema(description = "가게 고유 번호", example = "1")
    private Long storeId;
}
