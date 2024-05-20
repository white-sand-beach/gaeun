package com.todayeat.backend.consumer.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Schema(name = "UpdateConsumerRequest", description = "소비자 회원 정보 수정 요청")
public class UpdateConsumerRequest {

    @Schema(description = "프로필 사진 파일", example = "img.jpg")
    private MultipartFile profileImage;

    @Schema(description = "프로필 사진 URL", example = "https://----")
    private String imageUrl;

    @NotBlank(message = "nickname: 값이 비어 있지 않아야 합니다.")
    @Size(min = 2, max = 8, message = "nickname: 길이가 2에서 8 사이여야 합니다.")
    @Schema(description = "닉네임", example = "김지녕")
    private String nickname;

    @NotBlank(message = "phoneNumber: 값이 비어 있지 않아야 합니다.")
    @Size(min = 10, max = 11, message = "phoneNumber: 올바른 번호를 입력해주세요.")
    @Pattern(regexp = "^[0-9]*$", message = "phoneNumber: 숫자만 입력해주세요.")
    @Schema(description = "휴대폰 번호", example = "01012345678")
    private String phoneNumber;

    @NotNull(message = "isDonated: 값이 null이 아니어야 합니다.")
    @Schema(description = "나눔 여부. 일반인인 경우 false, 아닐 경우 true로 보내주시면 됩니다.", example = "false")
    private Boolean isDonated;
}
