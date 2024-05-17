package com.todayeat.backend.seller.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "판매자 정보 조회 응답")
public class GetSellerResponse {

    @Schema(description = "이메일", example = "example@domain.com")
    private String email;

    @Schema(description = "전화번호", example = "01012345678")
    private String phoneNumber;

    @Schema(description = "사업자 등록번호", example = "0123456789")
    private String registeredNo;

    @Schema(description = "가게 고유번호", example = "1")
    private Long storeId;
}
