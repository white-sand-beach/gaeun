package com.todayeat.backend.fcmtoken.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@RedisHash(value = "FCMToken", timeToLive = 60 * 60 * 24 * 14)
public class FCMToken {

    @Id
    private String id; // fcm token

    @Indexed
    private Long memberId;

    @Indexed
    private String role;

    @Builder
    private FCMToken(String id, Long memberId, String role) {
        this.id = id;
        this.memberId = memberId;
        this.role = role;
    }
}
