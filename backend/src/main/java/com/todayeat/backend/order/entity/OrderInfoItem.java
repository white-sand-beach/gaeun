package com.todayeat.backend.order.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.sale.entity.Sale;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE order_info_item SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE order_info_item_id = ?")
public class OrderInfoItem extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_info_item_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String content;

    @Column(nullable = false)
    private Integer originalPrice;

    @Column(nullable = false)
    private Integer sellPrice;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Integer paymentPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_info_id", referencedColumnName = "order_info_id")
    private OrderInfo orderInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private Menu menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", referencedColumnName = "sale_id")
    private Sale sale;

    @Builder
    private OrderInfoItem(String name, String content, Integer originalPrice, Integer sellPrice, Integer quantity, Integer paymentPrice, OrderInfo orderInfo, Menu menu, Sale sale) {
        this.name = name;
        this.content = content;
        this.originalPrice = originalPrice;
        this.sellPrice = sellPrice;
        this.quantity = quantity;
        this.paymentPrice = paymentPrice;
        this.orderInfo = orderInfo;
        this.menu = menu;
        this.sale = sale;
    }

    public static OrderInfoItem of(Sale sale, Integer quantity, OrderInfo orderInfo) {
        return builder()
                .name(sale.getName())
                .originalPrice(sale.getOriginalPrice())
                .sellPrice(sale.getSellPrice())
                .quantity(quantity)
                .paymentPrice(quantity * sale.getSellPrice())
                .orderInfo(orderInfo)
                .menu(sale.getMenu())
                .sale(sale)
                .build();
    }
}
