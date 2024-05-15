package com.todayeat.backend._common.response.success;

import lombok.Getter;

@Getter
public enum SuccessType {
    // consumer
    UPDATE_CONSUMER_SUCCESS("소비자 정보 수정에 성공하였습니다."),
    CHECK_NICKNAME_SUCCESS("닉네임 중복 확인에 성공하였습니다."),
    GET_CONSUMER_PROFILE_SUCCESS("소비자 프로필 정보 조회에 성공하였습니다."),
    GET_CONSUMER_SUCCESS("소비자 회원 정보 조회에 성공하였습니다."),
    LOGOUT_CONSUMER_SUCCESS("소비자 로그아웃에 성공하였습니다."),

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
    CREATE_CART_SUCCESS("장바구니 등록에 성공하였습니다."),
    GET_CART_LIST_SUCCESS("장바구니 목록 조회에 성공하였습니다."),
    UPDATE_CART_SUCCESS("장바구니 수량 변경에 성공하였습니다."),
    DELETE_CART_SUCCESS("장바구니 삭제에 성공하였습니다."),
    DELETE_ALL_CART_SUCCESS("장바구니 전체 삭제에 성공하였습니다."),


    // order
    CREATE_ORDER_SUCCESS("주문 등록에 성공하였습니다."),
    VALIDATE_ORDER_SUCCESS("결제 인증에 성공하였습니다."),
    UPDATE_ORDER_SELLER_SUCCESS("판매자 주문 상태 수정에 성공하였습니다."),
    UPDATE_ORDER_CONSUMER_SUCCESS("소비자 주문 상태 수정에 성공하였습니다."),
    GET_ORDER_LIST_CONSUMER_SUCCESS("소비자 주문 목록 조회에 성공하였습니다."),
    GET_ORDER_LIST_SELLER_SUCCESS("판매자 주문 목록 조회에 성공하였습니다."),

    // seller
    CREATE_SELLER_SUCCESS("판매자 회원가입에 성공하였습니다."),
    CHECK_EMAIL_SUCCESS("판매자 아이디(이메일) 사용 가능 여부 확인에 성공하였습니다."),
    CHECK_REGISTERED_NO_SUCCESS("판매자 사업자 등록번호 사용 가능 여부 확인에 성공하였습니다."),
    GET_EMAIL_SUCCESS("판매자 아이디(이메일) 확인에 성공하였습니다."),
    GET_TEMP_PASSWORD_SUCCESS("판매자 임시 비밀번호 생성에 성공하였습니다."),
    CHECK_TEMP_PASSWORD_SUCCESS("판매자 임시 비밀번호 확인에 성공하였습니다."),
    GET_SELLER_SUCCESS("판매자 회원 정보 조회에 성공하였습니다."),
    UPDATE_PASSWORD_SELLER_SUCCESS("판매자 비밀번호 수정에 성공하였습니다."),
    UPDATE_PHONE_NUMBER_SELLER_SUCCESS("판매자 전화번호 수정에 성공하였습니다."),

    // store
    CREATE_STORE_SUCCESS("가게 등록에 성공하였습니다."),
    GET_STORE_SUCCESS("가게 조회에 성공하였습니다."),
    GET_STORE_DETAIL_SUCCESS("가게 상세 조회에 성공하였습니다."),
    GET_STORE_LIST_SUCCESS("가게 목록 조회에 성공하였습니다."),
    UPDATE_STORE_SUCCESS("가게 수정에 성공하였습니다."),

    // category
    CREATE_CATEGORY_SUCCESS("카테고리 등록에 성공하였습니다."),
    GET_CATEGORY_LIST_SUCCESS("카테고리 리스트 조회에 성공하였습니다."),

    // menu
    CREATE_MENU_SUCCESS("메뉴 등록에 성공하였습니다."),
    GET_MENU_LIST_SUCCESS("메뉴 목록 조회에 성공하였습니다."),
    UPDATE_MENU_SUCCESS("메뉴 수정에 성공하였습니다."),
    DELETE_MENU_SUCCESS("메뉴 삭제에 성공하였습니다."),

    // store

    // token
    REISSUE_TOKEN_SUCCESS("토큰 재발급에 성공하였습니다."),

    // sale
    CREATE_SALE_SUCCESS("판매 등록에 성공하였습니다."),
    GET_SALE_LIST_SUCCESS("판매 목록 조회에 성공하였습니다."),
    GET_SALE_DETAIL_SUCCESS("판매 상세 조회에 성공하였습니다."),
    UPDATE_SALE_STATUS_SUCCESS("판매 상태 변경에 성공하였습니다."),
    UPDATE_SALE_CONTENT_SUCCESS("판매 내용 변경에 성공하였습니다."),
    UPDATE_SALE_STOCK_SUCCESS("판매 재고 변경에 성공하였습니다."),
    ;

    private final String msg;

    SuccessType(String msg) {
        this.msg = msg;
    }
}
