package com.todayeat.backend._common.response.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorType {

    /**
     * GLOBAL ERROR
     */
    METHOD_NOT_SUPPORTED(HttpStatus.BAD_REQUEST, "지원되지 않는 Http Method 입니다."),
    URL_NOT_FOUND(HttpStatus.BAD_REQUEST, "잘못된 URL 입니다."),
    PATH_VARIABLE_NOT_FOUND(HttpStatus.BAD_REQUEST, "Path Variable 이 없습니다."),
    REQUEST_PARAM_NOT_FOUND(HttpStatus.BAD_REQUEST, "Request Param 이 없습니다."),

    /**
     * CUSTOM ERROR
     */
    // consumer
    CONSUMER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 소비자를 찾을 수 없습니다."),

    // favorite

    // review

    // location

    // cart

    // order

    // seller
    EMAIL_CONFLICT(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),

    // store

    // category

    // menu

    // store

    // token
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "Http Header 에 토큰이 없습니다.")
    ;

    private HttpStatus httpStatus;
    private String msg;

    ErrorType(HttpStatus httpStatus, String msg) {
        this.httpStatus = httpStatus;
        this.msg = msg;
    }
}
