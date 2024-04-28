package com.todayeat.backend.seller.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
@Schema(name = "판매자 임시 비밀번호 확인 요청")
public class CheckTempPasswordSellerRequest {

    @Email(message = "email: 올바른 형식이 아닙니다.")
    @Size(max = 50, message = "email: 최대 50자까지 입력 가능합니다.")
    @Schema(description = "이메일", example = "example@domain.com")
    private String email;

    @Size(min = 6, max = 6, message = "tempPassword: 올바른 번호를 입력해주세요.")
    @Pattern(regexp = "^[0-9]*$", message = "tempPassword: 숫자만 입력해주세요.")
    @Schema(description = "임시 비밀번호", example = "123456")
    private String tempPassword;
}
