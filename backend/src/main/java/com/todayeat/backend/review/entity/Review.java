package com.todayeat.backend.review.entity;


import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE review SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE review_id = ?")
public class Review extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String content;

    @Column(nullable = true)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id", referencedColumnName = "consumer_id")
    private Consumer consumer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", referencedColumnName = "store_id")
    private Store store;

    @Builder
    private Review(String content, String imageUrl, Consumer consumer, Store store) {
        this.content = content;
        this.imageUrl = imageUrl;
        this.consumer = consumer;
        this.store = store;
    }
}
