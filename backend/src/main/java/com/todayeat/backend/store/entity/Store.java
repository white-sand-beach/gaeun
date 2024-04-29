package com.todayeat.backend.store.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.location.entity.Coordinate;
import com.todayeat.backend.seller.entity.Seller;
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
@SQLDelete(sql = "UPDATE store SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE store_id = ?")
public class Store extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String registeredName;

    @Column(nullable = false, length = 10)
    private String registeredNo;

    @Column(nullable = false, length = 10)
    private String bossName;

    @Embedded
    private Coordinate coordinate;

    @Column(nullable = false, length = 20)
    private String tel;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(nullable = true)
    private String image;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private Seller seller;

    @Builder
    private Store(Long id, String registeredName, String registeredNo, String bossName, Coordinate coordinate, String tel,
                  String name, String image, String operatingTime, String holiday, String originCountry,
                  String introduction, boolean isOpened, int reviewCnt, int favoriteCnt, Seller seller) {
        this.id = id;
        this.registeredName = registeredName;
        this.registeredNo = registeredNo;
        this.bossName = bossName;
        this.coordinate = coordinate;
        this.tel = tel;
        this.name = name;
        this.image = image;
        this.operatingTime = operatingTime;
        this.holiday = holiday;
        this.originCountry = originCountry;
        this.introduction = introduction;
        this.isOpened = isOpened;
        this.reviewCnt = reviewCnt;
        this.favoriteCnt = favoriteCnt;
        this.seller = seller;
    }

    public void updateStore(String registeredName, String bossName, Coordinate coordinate, String tel,
                            String name, String image, String operatingTime, String holiday, String originCountry,
                            String introduction) {
        this.registeredName = registeredName;
        this.bossName = bossName;
        this.coordinate = coordinate;
        this.tel = tel;
        this.name = name;
        this.image = image;
        this.operatingTime = operatingTime;
        this.holiday = holiday;
        this.originCountry = originCountry;
        this.introduction = introduction;
    }
}
