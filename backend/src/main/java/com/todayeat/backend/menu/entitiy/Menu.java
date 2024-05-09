package com.todayeat.backend.menu.entitiy;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE menu SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE menu_id = ?")
public class Menu extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Long id;

    @Column(nullable = true)
    private String imageUrl;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false)
    private Integer originalPrice;

    @Column(nullable = false)
    private Integer sellPrice;

    @Column(nullable = false)
    private Integer discountRate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @Builder
    private Menu(String imageUrl, String name, Integer originalPrice, Integer sellPrice, Integer discountRate, Store store) {
        this.imageUrl = imageUrl;
        this.name = name;
        this.originalPrice = originalPrice;
        this.sellPrice = sellPrice;
        this.discountRate = discountRate;
        this.store = store;
    }

    // 현재 더티체킹 방법을 사용하지 않아서 미사용
    public void update(String imageUrl, String name, Integer originalPrice, Integer sellPrice, Integer discountRate, Integer sequence) {

        this.imageUrl = imageUrl;

        this.name = name;

        this.originalPrice = originalPrice;

        this.sellPrice = sellPrice;

        this.discountRate = discountRate;
    }
}
