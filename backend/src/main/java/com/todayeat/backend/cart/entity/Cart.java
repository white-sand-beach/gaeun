package com.todayeat.backend.cart.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;

@Getter
@RedisHash(value = "cart", timeToLive = 60 * 60 * 24)
public class Cart implements Serializable {

    @Id
    private String id;

    private Integer quantity; //담은 수량

    @Indexed
    private Long consumerId;

    @Indexed
    private Long storeId;

    @Indexed
    private Long saleId;

    @Builder
    private Cart(String id, Integer quantity, Long consumerId, Long storeId, Long saleId) {
        this.id = id;
        this.quantity = quantity;
        this.consumerId = consumerId;
        this.storeId = storeId;
        this.saleId = saleId;
    }

    public void updateQuantity(Integer quantity) {

        this.quantity = quantity;
    }
}
