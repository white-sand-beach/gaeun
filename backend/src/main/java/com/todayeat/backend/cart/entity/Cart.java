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

    private Integer quantity;

    @Indexed
    private Long consumerId;

    @Indexed
    private Long storeId;

    private String storeName;

    @Indexed
    private Long saleId;

    @Builder
    public Cart(Integer quantity, Long consumerId, Long storeId, String storeName, Long saleId) {
        this.quantity = quantity;
        this.consumerId = consumerId;
        this.storeId = storeId;
        this.storeName = storeName;
        this.saleId = saleId;
    }

    public Integer updateQuantity(Integer quantity) {

        return this.quantity += quantity;
    }
}
