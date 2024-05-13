package com.todayeat.backend.order.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.sale.entity.Sale;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE order_info_item SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE order_info_item_id = ?")
public class OrderInfoItem extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_info_item_id")
    private Long id;

    private String name;

    private String content;

    private Integer originalPrice;

    private Integer sellPrice;

    private Integer quantity;

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
}
