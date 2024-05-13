package com.todayeat.backend.order.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.review.entity.Review;
import com.todayeat.backend.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SQLDelete;

@Getter
@Entity
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE order_info SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE order_info_id = ?")
public class OrderInfo extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_info_id")
    private Long id;

    @Column(nullable = true)
    private String paymentId;

    @Column(nullable = false, length = 20)
    private String orderNo;

    @Column(nullable = false)
    private Integer totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @ColumnDefault("'UNPAID'")
    private OrderInfoStatus status;

    @Column(nullable = true)
    private Integer takenTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id", referencedColumnName = "consumer_id")
    private Consumer consumer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", referencedColumnName = "store_id")
    private Store store;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review review;

    @Builder
    private OrderInfo(String paymentId, String orderNo, Integer totalPrice, OrderInfoStatus status, Integer takenTime, Consumer consumer, Store store, Review review) {
        this.paymentId = paymentId;
        this.orderNo = orderNo;
        this.totalPrice = totalPrice;
        this.status = status;
        this.takenTime = takenTime;
        this.consumer = consumer;
        this.store = store;
        this.review = review;
    }

    public static OrderInfo of(String paymentId, String orderNo, Integer totalPrice, Consumer consumer, Store store) {
        return builder()
                .paymentId(paymentId)
                .orderNo(orderNo)
                .totalPrice(totalPrice)
                .consumer(consumer)
                .store(store)
                .build();
    }
}
