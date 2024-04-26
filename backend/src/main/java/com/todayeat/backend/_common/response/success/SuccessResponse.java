package com.todayeat.backend._common.response.success;

import lombok.Getter;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import org.springframework.http.HttpStatus;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuccessResponse <T>{

    private int code;
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

    public static SuccessResponse<Void> of(SuccessType successType) {
        return SuccessResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .msg(successType.getMsg())
                .build();
    }

}
