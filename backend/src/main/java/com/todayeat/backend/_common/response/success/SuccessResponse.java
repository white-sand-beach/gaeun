package com.todayeat.backend._common.response.success;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import org.springframework.http.HttpStatus;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(name = "SuccessResponse", description = "성공 응답")
public class SuccessResponse <T>{

    @Schema(description = "상태 코드", example = "200")
    private int code;

    @Schema(description = "상태 메시지", example = "성공")
    private String msg;

    private T data;

    @Builder
    private SuccessResponse(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static <T> SuccessResponse<T> of(T data, SuccessType successType) {
        return SuccessResponse.<T>builder()
                .code(HttpStatus.OK.value())
                .msg(successType.getMsg())
                .data(data)
                .build();
    }

    public static SuccessResponse of(SuccessType successType) {
        return SuccessResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .msg(successType.getMsg())
                .build();
    }

}
