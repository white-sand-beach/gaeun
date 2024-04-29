package com.todayeat.backend._common.response.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorType {

    /**
     * GLOBAL ERROR
     */
    METHOD_NOT_SUPPORTED(HttpStatus.BAD_REQUEST, "지원되지 않는 Http Method입니다."),
    URL_NOT_FOUND(HttpStatus.BAD_REQUEST, "잘못된 URL 입니다."),
    PATH_VARIABLE_NOT_FOUND(HttpStatus.BAD_REQUEST, "Path Variable이 없습니다."),
    REQUEST_PARAM_NOT_FOUND(HttpStatus.BAD_REQUEST, "Request Param이 없습니다."),

    /**
     * CUSTOM ERROR
     */
    // consumer
    CONSUMER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 소비자를 찾을 수 없습니다."),
    NICKNAME_CONFLICT(HttpStatus.CONFLICT, "이미 사용중인 닉네임입니다."),

    // favorite

    // review

    // location

    // cart

    // order

    // seller
    EMAIL_CONFLICT(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 이메일입니다."),
    PHONE_NUMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 전화번호입니다."),
    TEMP_PASSWORD_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 임시 비밀번호입니다."),
    EMAIL_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "이메일이 일치하지 않습니다."),
    PASSWORD_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다."),
    NEW_CHECK_PASSWORD_BAD_REQUEST(HttpStatus.UNAUTHORIZED, "새 비밀번호와 확인 비밀번호가 일치하지 않습니다."),
    NEW_PASSWORD_BAD_REQUEST(HttpStatus.BAD_REQUEST, "새로운 비밀번호를 입력해야 합니다."),
    SELLER_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "판매자 인증에 실패했습니다."),

    // store
    STORE_CONFLICT(HttpStatus.CONFLICT, "이미 존재하는 사업자 등록번호입니다."),

    // category

    // menu

    // store

    // mail
    MAIL_INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "메일 전송에 실패했습니다."),

    // token
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "Http Header에 토큰이 없습니다."),
    ROLE_MISMATCH(HttpStatus.FORBIDDEN, "해당 요청에 대한 권한이 없습니다."),
    ;

    private HttpStatus httpStatus;
    private String msg;

    ErrorType(HttpStatus httpStatus, String msg) {
        this.httpStatus = httpStatus;
        this.msg = msg;
    }
}
