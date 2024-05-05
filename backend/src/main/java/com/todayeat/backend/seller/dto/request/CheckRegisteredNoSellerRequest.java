package com.todayeat.backend.seller.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
@Schema(name = "판매자 사업자 등록번호 사용 가능 여부 확인 요청")
public class CheckRegisteredNoSellerRequest {

    @NotBlank(message = "registeredNo: 빈 값이 아니어야 합니다.")
    @Size(max = 10, message = "registeredNo: 최대 길이는 10자입니다.")
    @Schema(description = "사업자 등록번호", example = "0123456789")
    private String registeredNo;
}
