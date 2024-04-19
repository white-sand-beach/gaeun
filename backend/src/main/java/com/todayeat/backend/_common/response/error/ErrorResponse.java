package com.todayeat.backend._common.response.error;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.List;

@Getter
public class ErrorResponse {

    private int code;
    private String status;
    private String msg;

    @Builder
    private ErrorResponse(int code, String status, String msg) {
        this.code = code;
        this.status = status;
        this.msg = msg;
    }

    public static ErrorResponse of(ErrorType errorType) {
        return builder()
                .code(errorType.getHttpStatus().value())
                .status(errorType.getHttpStatus().name())
                .msg(errorType.getMsg())
                .build();
    }

    public static ErrorResponse of(BindingResult bindingResult) {
        StringBuilder sb = new StringBuilder();

        if (bindingResult.hasErrors()) {
            List<ObjectError> errors = bindingResult.getAllErrors();
            for (ObjectError error : errors) {
                sb.append(error.getDefaultMessage()).append(" ");
            }
        }

        return builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .status(HttpStatus.BAD_REQUEST.name())
                .msg(sb.toString())
                .build();
    }

}
