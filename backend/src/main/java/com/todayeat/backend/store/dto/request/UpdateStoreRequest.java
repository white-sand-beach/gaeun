package com.todayeat.backend.store.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Schema(name = "가게 수정 요청")
public class UpdateStoreRequest {

    @NotBlank(message = "registeredName: 빈 값이 아니어야 합니다.")
    @Size(max = 50, message = "registeredName: 최대 길이는 50자입니다.")
    @Schema(description = "상호명", example = "상호")
    private String registeredName;

    @NotBlank(message = "bossName: 빈 값이 아니어야 합니다.")
    @Size(max = 10, message = "bossName: 최대 길이는 10자입니다.")
    @Schema(description = "대표자명", example = "대표자")
    private String bossName;

    @NotBlank(message = "address: 빈 값이 아니어야 합니다.")
    @Size(max = 50, message = "address: 길이가 1에서 50 사이여야 합니다.")
    @Schema(description = "주소", example = "OO OO시 O로 OOO")
    private String address;

    @NotNull(message = "latitude: 값이 null이 아니어야 합니다.")
    @DecimalMin(value = "33", message = "latitude: 33 이상이어야 합니다.")
    @DecimalMax(value = "38", message = "latitude: 38 이하이어야 합니다.")
    @Schema(description = "위도", example = "36.936936")
    private BigDecimal latitude;

    @NotNull(message = "longitude: 값이 null이 아니어야 합니다.")
    @DecimalMin(value = "124", message = "longitude: 124 이상이어야 합니다.")
    @DecimalMax(value = "132", message = "longitude: 132 이하이어야 합니다.")
    @Schema(description = "경도", example = "124.816326")
    private BigDecimal longitude;

    @Size(min = 7, max = 20, message = "tel: 올바른 번호를 입력해주세요.")
    @Pattern(regexp = "^[0-9]*$", message = "tel: 숫자만 입력해주세요.")
    @Schema(description = "전화번호", example = "01012345678")
    private String tel;

    @NotBlank(message = "name: 빈 값이 아니어야 합니다.")
    @Size(max = 10, message = "name: 최대 길이는 10자입니다.")
    @Schema(description = "가게명", example = "가게")
    private String name;

    @Schema(description = "대표 이미지", example = "img.jpg")
    private MultipartFile image;

    @Schema(description = "영업 시간", example = "00시 ~ 24시")
    private String operatingTime;

    @Schema(description = "휴무일", example = "연중무휴")
    private String holiday;

    @Schema(description = "원산지", example = "국산")
    private String originCountry;

    @Schema(description = "소개", example = "방씀다")
    private String introduction;

    @Schema(description = "카테고리 아이디 목록", example = "[1, 2, 3]")
    private List<Long> categoryIdList;
}
