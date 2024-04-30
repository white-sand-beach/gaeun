package com.todayeat.backend.seller.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "판매자 임시 비밀번호 확인 응답")
public class CheckTempPasswordSellerResponse {

    @Schema(description = "일치 여부", example = "true")
    private Boolean isValid;
}
