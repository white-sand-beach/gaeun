package com.todayeat.backend.location.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.consumer.entity.Consumer;
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
@SQLDelete(sql = "UPDATE location SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE location_id = ?")
public class Location extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long id;

    @Embedded
    private Address address;

    @Column(length = 10, nullable = true)
    private String alias;

    @Column(nullable = false)
    @ColumnDefault("true")
    private Boolean isSelected;

    @Column(nullable = false)
    @ColumnDefault("2") // 임시
    private Integer radius;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id", referencedColumnName = "consumer_id")
    private Consumer consumer;

    @Builder
    private Location(Address address, String alias, Boolean isSelected, Integer radius, Consumer consumer) {
        this.address = address;
        this.alias = alias;
        this.isSelected = isSelected;
        this.radius = radius;
        this.consumer = consumer;
    }
}
