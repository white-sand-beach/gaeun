package com.todayeat.backend._common.notification.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateOrderItemNotification {

    private String name;

    private Integer quantity;

    @Builder
    private CreateOrderItemNotification(String name, Integer quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    public static CreateOrderItemNotification of (String name, Integer quantity) {

        return builder()
                .name(name)
                .quantity(quantity)
                .build();
    }
}
