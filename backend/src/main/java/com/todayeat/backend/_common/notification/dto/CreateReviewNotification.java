package com.todayeat.backend._common.notification.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateReviewNotification {

    private Long reviewId;

    private String nickname;

    @Builder
    private CreateReviewNotification(Long reviewId, String nickname) {
        this.reviewId = reviewId;
        this.nickname = nickname;
    }

    public static CreateReviewNotification of(Long reviewId, String nickname) {

        return builder()
                .reviewId(reviewId)
                .nickname(nickname)
                .build();
    }

    public String getType() {

        return "review";
    }

    public Long getTypeId() {

        return reviewId;
    }

    public String getContent() {

        return nickname;
    }

    public String getBody() {

        return nickname + "님의 편지가 도착했어요.";
    }
}
