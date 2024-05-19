package com.todayeat.backend.sale.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;

import java.util.Objects;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE sale SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE sale_id = ?")
public class Sale extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_id")
    private Long id;

    @Column(nullable = true)
    private String imageUrl;

    @Column(nullable = true)
    private String name;

    @Column(nullable = false)
    private Integer originalPrice;

    @Column(nullable = false)
    private Integer sellPrice;

    @Column(nullable = false)
    private Integer discountRate;

    @Column(nullable = true, length = 100)
    private String content;

    @Column(nullable = false)
    private Integer stock; // 재고량

    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer totalQuantity; // 현재 판매량

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean isFinished; //죵료 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", referencedColumnName = "store_id")
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private Menu menu;

    @Builder
    private Sale(String imageUrl, String name, Integer originalPrice, Integer sellPrice, Integer discountRate, String content, Integer stock, Integer totalQuantity, Boolean isFinished, Store store, Menu menu) {
        this.imageUrl = imageUrl;
        this.name = name;
        this.originalPrice = originalPrice;
        this.sellPrice = sellPrice;
        this.discountRate = discountRate;
        this.content = content;
        this.stock = stock;
        this.totalQuantity = totalQuantity;
        this.isFinished = isFinished;
        this.store = store;
        this.menu = menu;
    }

    public boolean update(String content, Integer stock) {

        // todo 주문 접수 건수도 고려하기

        if (this.totalQuantity > stock) {
            return false;
        }

        this.stock = stock;
        this.content = content;

        return true;
    }

    public boolean isFinished(Boolean isFinished) {

        return this.isFinished = Objects.equals(totalQuantity, stock) || isFinished;
    }

    public void updateTotalQuantity(Integer quantity) {
        this.totalQuantity += quantity;
    }
}
