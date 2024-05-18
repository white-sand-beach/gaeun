package com.todayeat.backend._common.notification.dto;

import com.todayeat.backend.seller.entity.Seller;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateReviewNotification {

    private Long reviewId;

    private String nickname;

    private Seller seller;

    @Builder
    private CreateReviewNotification(Long reviewId, String nickname, Seller seller) {
        this.reviewId = reviewId;
        this.nickname = nickname;
        this.seller = seller;
    }

    public static CreateReviewNotification of(Long reviewId, String nickname, Seller seller) {

        return builder()
                .reviewId(reviewId)
                .nickname(nickname)
                .seller(seller)
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
