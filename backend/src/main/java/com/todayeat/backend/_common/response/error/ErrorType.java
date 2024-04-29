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
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에서 에러가 발생하였습니다."),

    // consumer
    CONSUMER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 소비자를 찾을 수 없습니다."),
    NICKNAME_CONFLICT(HttpStatus.CONFLICT, "이미 사용중인 닉네임입니다."),

    // favorite

    // review

    // location
    LOCATION_CONFLICT(HttpStatus.CONFLICT, "이미 존재하는 주소입니다."),
    LOCATION_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 위치입니다."),

    // cart

    // order

    // seller
    EMAIL_CONFLICT(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 이메일입니다."),
    PHONE_NUMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 전화번호입니다."),
    EMAIL_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "이메일이 일치하지 않습니다."),
    PASSWORD_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다."),
    TEMP_PASSWORD_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 임시 비밀번호입니다."),
    NEW_CHECK_PASSWORD_BAD_REQUEST(HttpStatus.UNAUTHORIZED, "새 비밀번호와 확인 비밀번호가 일치하지 않습니다."),
    NEW_PASSWORD_BAD_REQUEST(HttpStatus.BAD_REQUEST, "새로운 비밀번호를 입력해야 합니다."),
    SELLER_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "판매자 인증에 실패했습니다."),

    // store

    // category

    // menu

    // store

    // mail
    MAIL_INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "메일 전송에 실패했습니다."),

    // token
    TOKEN_INVALID(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),

    // image
    IMAGE_FORMAT_INVALID(HttpStatus.BAD_REQUEST, "이미지 형식의 파일이 아닙니다."),
    IMAGE_URL_FORMAT_INVALID(HttpStatus.BAD_REQUEST, "이미지 url형식이 잘못되었습니다."),
    ;

    private HttpStatus httpStatus;
    private String msg;

    ErrorType(HttpStatus httpStatus, String msg) {
        this.httpStatus = httpStatus;
        this.msg = msg;
    }
}
