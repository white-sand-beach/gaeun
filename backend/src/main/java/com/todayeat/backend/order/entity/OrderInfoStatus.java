package com.todayeat.backend.order.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderInfoStatus {
    UNPAID("결제 전"),
    PAID("결제 완료"),
    CANCEL("취소됨"),
    DENIED("거절됨"),
    IN_PROGRESS("진행중"),
    PREPARED("준비 완료"),
    FINISHED("수령 완료"),
    ;

    private final String description;
}
