package com.todayeat.backend.seller.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
@Schema(name = "판매자 비밀번호 수정 요청")
public class UpdatePasswordSellerRequest {

    @Size(min = 8, max = 20, message = "password: 최소 8자리, 최대 20자까지 입력 가능합니다.")
    @Pattern(regexp = "^(?=.*[A-Z]|.*[a-z]|.*\\d|.*[!@#$%&*?])[A-Za-z\\d@$!%*#?&]{1,20}$", message = "password: 영문자와 숫자, @$!%*#?&만 입력 가능합니다.")
    @Schema(description = "기존 비밀번호", example = "Password!")
    private String oldPassword;

    @Size(min = 8, max = 20, message = "password: 최소 8자리, 최대 20자까지 입력 가능합니다.")
    @Pattern(regexp = "^(?=.*[A-Z]|.*[a-z]|.*\\d|.*[!@#$%&*?])[A-Za-z\\d@$!%*#?&]{1,20}$", message = "password: 영문자와 숫자, @$!%*#?&만 입력 가능합니다.")
    @Schema(description = "새 비밀번호", example = "Password!")
    private String newPassword;

    @Size(min = 8, max = 20, message = "password: 최소 8자리, 최대 20자까지 입력 가능합니다.")
    @Pattern(regexp = "^(?=.*[A-Z]|.*[a-z]|.*\\d|.*[!@#$%&*?])[A-Za-z\\d@$!%*#?&]{1,20}$", message = "password: 영문자와 숫자, @$!%*#?&만 입력 가능합니다.")
    @Schema(description = "확인용 비밀번호", example = "Password!")
    private String checkPassword;
}
