package com.todayeat.backend.store.entity;

import com.todayeat.backend._common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SQLDelete;
import org.locationtech.jts.geom.Point;

@Getter
@Setter
@Entity
@DynamicInsert
@NoArgsConstructor()
@SQLDelete(sql = "UPDATE store SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE store_id = ?")
public class Store extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String registeredName;

    @Column(nullable = false, length = 10)
    private String bossName;

    @Column(nullable = false)
    private String address;

    @Column(columnDefinition = "Point")
    private Point location;

    @Column(nullable = false, length = 20)
    private String tel;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(nullable = true)
    private String imageURL;

    @Column(nullable = true)
    private String operatingTime;

    @Column(nullable = true)
    private String holiday;

    @Column(nullable = true)
    private String originCountry;

    @Column(nullable = true)
    private String introduction;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isOpened;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int reviewCnt;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int favoriteCnt;

    public void updateIsOpened() {
        this.isOpened = !this.isOpened;

    public void updateFavoriteCnt(int value) {
        this.favoriteCnt += value;
    }
}
