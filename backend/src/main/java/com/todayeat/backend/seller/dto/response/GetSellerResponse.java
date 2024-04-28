package com.todayeat.backend.seller.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Setter;

@Setter
@Schema(name = "판매자 정보 조회 응답")
public class GetSellerResponse {

    @Schema(description = "이메일", example = "example@domain.com")
    private String email;

    @Schema(description = "전화번호", example = "01012345678")
    private String phoneNumber;
}
