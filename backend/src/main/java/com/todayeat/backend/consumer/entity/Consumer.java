package com.todayeat.backend.consumer.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2Provider;
import com.todayeat.backend.favorite.entity.Favorite;
import com.todayeat.backend.location.entity.Location;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SQLDelete;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE consumer SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE consumer_id = ?")
public class Consumer extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consumer_id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OAuth2Provider socialType;

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length = 8, nullable = true)
    private String nickname;

    @Column(nullable = true)
    private String profileImage;

    @Column(length = 20, nullable = true)
    private String phoneNumber;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer orderCnt;

    @OneToMany(mappedBy = "consumer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Location> locations = new ArrayList<>();

    @OneToMany(mappedBy = "consumer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorite> favorites = new ArrayList<>();

    @Builder
    private Consumer(OAuth2Provider socialType, String email, String nickname, String profileImage, String phoneNumber) {
        this.socialType = socialType;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.phoneNumber = phoneNumber;
    }

    public boolean isJoined() {
        return this.nickname != null && this.phoneNumber != null;
    }

    public void updateOrderCnt(int value) {
        this.orderCnt += value;
    }
}
