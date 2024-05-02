package com.todayeat.backend._common.response.success;

import lombok.Getter;

@Getter
public enum SuccessType {
    // consumer
    UPDATE_CONSUMER_SUCCESS("소비자 정보 수정에 성공하였습니다."),
    CHECK_NICKNAME_SUCCESS("닉네임 중복 확인에 성공하였습니다."),
    GET_CONSUMER_SUCCESS("소비자 회원 정보 조회에 성공하였습니다."),

    // favorite
    CREATE_FAVORITE_SUCCESS("찜 등록에 성공하였습니다."),
    DELETE_FAVORITE_SUCCESS("찜 삭제에 성공하였습니다."),
    GET_FAVORITES_SUCCESS("찜 목록 조회에 성공하였습니다."),

    // review

    // location
    CREATE_LOCATION_SUCCESS("위치 등록에 성공하였습니다."),
    GET_LOCATIONS_SUCCESS("사용자의 위치 목록 조회에 성공하였습니다."),
    GET_SELECTED_LOCATION_SUCCESS("선택된 위치 조회에 성공하였습니다."),
    UPDATE_LOCATION_SUCCESS("위치 수정에 성공하였습니다."),
    UPDATE_SELECTED_LOCATION_SUCCESS("위치 선택에 성공하였습니다."),
    DELETE_LOCATION_SUCCESS("위치 삭제에 성공하였습니다."),

    // cart

    // order

    // seller
    CREATE_SELLER_SUCCESS("판매자 회원가입에 성공하였습니다."),
    CHECK_EMAIL_SUCCESS("아이디(이메일) 사용 가능 여부 확인에 성공하였습니다."),
    GET_EMAIL_SUCCESS("아이디(이메일) 확인에 성공하였습니다."),
    GET_TEMP_PASSWORD_SUCCESS("임시 비밀번호 생성에 성공하였습니다."),
    CHECK_TEMP_PASSWORD_SUCCESS("임시 비밀번호 확인에 성공하였습니다."),
    GET_SELLER_SUCCESS("판매자 회원 정보 조회에 성공하였습니다."),
    UPDATE_PASSWORD_SELLER_SUCCESS("판매자 비밀번호 수정에 성공하였습니다."),
    UPDATE_PHONE_NUMBER_SELLER_SUCCESS("판매자 전화번호 수정에 성공하였습니다."),

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
