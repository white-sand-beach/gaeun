package com.todayeat.backend.seller.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Setter;

@Setter
@Schema(name = "판매자 아이디(이메일) 확인 응답")
public class FindEmailSellerResponse {

    @Schema(description = "이메일", example = "example@domain.com")
    private String Email;
}
