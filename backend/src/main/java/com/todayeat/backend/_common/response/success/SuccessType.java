package com.todayeat.backend._common.response.success;

import lombok.Getter;

@Getter
public enum SuccessType {
    ;

    private final String msg;

    SuccessType(String msg) {
        this.msg = msg;
    }
}
