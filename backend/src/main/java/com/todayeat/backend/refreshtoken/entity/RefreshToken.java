package com.todayeat.backend.refreshtoken.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;

@ToString
@Getter
@RedisHash(value = "refreshToken", timeToLive = 60 * 60 * 24 * 14) // 14일
public class RefreshToken implements Serializable {

    @Id
    private String refreshToken;

    private String accessToken;

    @Indexed
    private Long memberId;

    @Indexed
    private String role;

    @Builder
    private RefreshToken(String refreshToken, String accessToken, Long memberId, String role) {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.memberId = memberId;
        this.role = role;
    }

    public static RefreshToken of(String refreshToken, String accessToken, Long memberId, String role) {
        return builder()
                .refreshToken(refreshToken)
                .accessToken(accessToken)
                .memberId(memberId)
                .role(role)
                .build();
    }
}
