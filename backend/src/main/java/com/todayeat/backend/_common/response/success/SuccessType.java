package com.todayeat.backend._common.response.success;

import lombok.Getter;

@Getter
public enum SuccessType {
    // consumer
    UPDATE_CONSUMER_SUCCESS("소비자 정보 수정에 성공하였습니다."),
    CHECK_NICKNAME_SUCCESS("닉네임 중복 확인에 성공하였습니다."),

    // favorite

    // review

    // location

    // cart

    // order

    // seller
    CREATE_SELLER_SUCCESS("판매자 회원가입에 성공하였습니다."),

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
