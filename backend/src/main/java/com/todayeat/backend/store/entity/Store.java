package com.todayeat.backend.store.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.category.entity.StoreCategory;
import com.todayeat.backend.seller.entity.Location;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SQLDelete;

import java.util.ArrayList;
import java.util.List;

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

    @Column(nullable = false, length = 50)
    private String address;

    @Column(nullable = false, length = 50)
    private String roadAddress;

    @Embedded
    private Location location;

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

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<StoreCategory> storeCategoryList = new ArrayList<>();

    public void updateIsOpened(Boolean isOpened) {
        this.isOpened = isOpened;
    }

    public void updateFavoriteCnt(int value) {
        this.favoriteCnt += value;
    }
}