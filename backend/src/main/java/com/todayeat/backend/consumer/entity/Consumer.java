package com.todayeat.backend.consumer.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.consumer.dto.request.UpdateConsumerRequest;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2Provider;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Entity
@Getter
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

    @Column(length = 10, nullable = true)
    private String nickname;

    @Column(nullable = false)
    private String profileImage;

    @Column(length = 20, nullable = true)
    private String phoneNumber;

    @Builder
    private Consumer(OAuth2Provider socialType, String email, String nickname, String profileImage, String phoneNumber) {
        this.socialType = socialType;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.phoneNumber = phoneNumber;
    }

    public void update(UpdateConsumerRequest request) {
        this.nickname = request.getNickname();
        this.phoneNumber = request.getPhoneNumber();
    }
}
