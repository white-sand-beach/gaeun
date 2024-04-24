package com.todayeat.backend.seller.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupSellerRequest {

    @Email(message = "email: 올바른 형식이 아닙니다.")
    @Size(max = 50, message = "email: 최대 50자까지 입력 가능합니다.")
    @Schema(description = "이메일", example = "example@domain.com")
    private String email;

    @NotEmpty
    @Size(max = 20, message = "password: 최대 20자까지 입력 가능합니다.")
    @Pattern(regexp = "^(?=.*[A-Z]|.*[a-z]|.*\\d|.*[!@#$%&*?])[A-Za-z\\d@$!%*#?&]{1,20}$", message = "password: 영문자와 숫자, @$!%*#?&만 입력 가능합니다.")
    @Schema(description = "비밀번호", example = "Password!")
    private String password;

    @Size(min = 10, max = 11, message = "phoneNumber: 올바른 번호를 입력해주세요.")
    @Pattern(regexp = "^[0-9]*$", message = "phoneNumber: 숫자만 입력해주세요.")
    @Schema(description = "전화번호", example = "01012345678")
    private String phoneNumber;
}
