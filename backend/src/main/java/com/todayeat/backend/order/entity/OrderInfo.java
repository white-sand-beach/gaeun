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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.todayeat.backend.order.entity.OrderInfoStatus.PAID;
import static com.todayeat.backend.order.entity.OrderInfoStatus.UNPAID;

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

    @Column(nullable = false, length = 50)
    private String orderNo;

    @Column(nullable = false)
    private Integer originalPrice;

    @Column(nullable = false)
    private Integer discountPrice;

    @Column(nullable = false)
    private Integer paymentPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @ColumnDefault("'UNPAID'")
    private OrderInfoStatus status;

    @Column(nullable = true)
    private Integer takenTime;

    @Column(nullable = true)
    private LocalDateTime approvedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id", referencedColumnName = "consumer_id")
    private Consumer consumer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", referencedColumnName = "store_id")
    private Store store;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review review;

    @OneToMany(mappedBy = "orderInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderInfoItem> orderInfoItemList = new ArrayList<>();

    @Builder
    private OrderInfo(String paymentId, String orderNo, Integer originalPrice, Integer discountPrice, Integer paymentPrice, OrderInfoStatus status, Integer takenTime, LocalDateTime approvedAt, Consumer consumer, Store store, Review review) {
        this.paymentId = paymentId;
        this.orderNo = orderNo;
        this.originalPrice = originalPrice;
        this.discountPrice = discountPrice;
        this.paymentPrice = paymentPrice;
        this.status = status;
        this.takenTime = takenTime;
        this.approvedAt = approvedAt;
        this.consumer = consumer;
        this.store = store;
        this.review = review;
    }

    public static OrderInfo of(String orderNo, Integer originalPrice, Integer discountPrice, Integer paymentPrice, Consumer consumer, Store store) {
        return builder()
                .orderNo(orderNo)
                .originalPrice(originalPrice)
                .discountPrice(discountPrice)
                .paymentPrice(paymentPrice)
                .status(paymentPrice.intValue() == 0? PAID : UNPAID)
                .consumer(consumer)
                .store(store)
                .build();
    }

    public void updatePaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public void updateStatus(OrderInfoStatus status) {
        this.status = status;
    }

    public void updateTakenTimeAndApprovedAt(Integer takenTime) {
        this.takenTime = takenTime;
        this.approvedAt = LocalDateTime.now();
    }

    public void saveReview(Review review) {
        this.review = review;
    }
}
