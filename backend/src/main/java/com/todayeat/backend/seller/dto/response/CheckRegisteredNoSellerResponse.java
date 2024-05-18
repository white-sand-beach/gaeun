package com.todayeat.backend.seller.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "판매자 사업자 등록번호 사용 가능 여부 확인 응답")
public class CheckRegisteredNoSellerResponse {

    @Schema(description = "사용 가능 여부", example = "true")
    private Boolean isValid;
}
