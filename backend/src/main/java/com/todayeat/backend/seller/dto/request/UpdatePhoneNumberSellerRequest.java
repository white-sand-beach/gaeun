package com.todayeat.backend.seller.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
@Schema(name = "판매자 전화번호 수정 요청")
public class UpdatePhoneNumberSellerRequest {

    @Size(min = 10, max = 11, message = "phoneNumber: 올바른 번호를 입력해주세요.")
    @Pattern(regexp = "^[0-9]*$", message = "phoneNumber: 숫자만 입력해주세요.")
    @Schema(description = "전화번호", example = "01012345678")
    private String phoneNumber;
}
