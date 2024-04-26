package com.todayeat.backend.seller.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
@Schema(name = "판매자 아이디(이메일) 사용 가능 여부 확인 요청")
public class CheckEmailRequest {

    @Email(message = "email: 올바른 형식이 아닙니다.")
    @Size(max = 50, message = "email: 최대 50자까지 입력 가능합니다.")
    @Schema(description = "이메일", example = "example@domain.com")
    private String email;
}
