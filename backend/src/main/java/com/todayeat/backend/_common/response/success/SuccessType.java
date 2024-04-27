package com.todayeat.backend._common.response.success;

import lombok.Getter;

@Getter
public enum SuccessType {
    // consumer

    // favorite

    // review

    // location

    // cart

    // order

    // seller
    CREATE_SELLER_SUCCESS("판매자 회원가입에 성공하였습니다."),
    CHECK_EMAIL_SUCCESS("아이디(이메일) 사용 가능 여부 확인에 성공하였습니다."),
    GET_EMAIL_SUCCESS("아이디(이메일) 확인에 성공하였습니다."),
    GET_TEMP_PASSWORD_SUCCESS("임시 비밀번호 생성에 성공하였습니다."),
    CHECK_TEMP_PASSWORD_SUCCESS("임시 비밀번호 확인에 성공하였습니다."),

    // store

    // category

    // menu

    // store

    ;

    private final String msg;

    SuccessType(String msg) {
        this.msg = msg;
    }
}
