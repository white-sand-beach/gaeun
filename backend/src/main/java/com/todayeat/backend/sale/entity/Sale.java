package com.todayeat.backend.sale.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;

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

    @Column(nullable = false)
    private Integer originalPrice;

    @Column(nullable = false)
    private Integer sellPrice;

    @Column(nullable = false)
    private Integer discountRate;

    @Column(nullable = true, length = 100)
    private String content;

    @Column(nullable = false)
    private Integer sequence; // 화면에 보이는 메뉴 목차 순서

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean isFinished; //죵료 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", referencedColumnName = "store_id")
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private Menu menu;
}
