package com.todayeat.backend.review.dto.response;

import com.todayeat.backend.review.entity.Review;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

@Getter
@Schema(name = "GetReviewConsumerResponse", description = "소비자 리뷰 조회 응답")
public class GetReviewConsumerResponse {

    @Schema(description = "리뷰 ID", example = "1")
    private Long reviewId;

    @Schema(description = "리뷰 내용", example = "감사합니다.")
    private String content;

    @Schema(description = "리뷰 이미지", example = "https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/consumer/2/review-image/2516e334-053e-4281-884d-77d66d85187c.jpg")
    private String imageUrl;

    @Schema(description = "리뷰 작성자 ID", example = "1")
    private Long consumerId;

    @Schema(description = "리뷰 이미지", example = "https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/consumer/2/profile-image/2516e334-053e-4281-884d-77d66d85187c.jpg")
    private String profileImage;

    @Schema(description = "작성자 닉네임", example = "맛잘알용가리")
    private String nickname;

    @Schema(description = "리뷰한 가게 ID", example = "1")
    private Long storeId;

    @Schema(description = "리뷰한 가게명", example = "초원식당")
    private String storeName;

    @Schema(description = "리뷰 작성 날짜", example = "2024.05.14(화)")
    private String createdAt;

    @Builder
    private GetReviewConsumerResponse(Long reviewId, String content, String imageUrl, Long consumerId, String profileImage, String nickname, Long storeId, String storeName, String createdAt) {
        this.reviewId = reviewId;
        this.content = content;
        this.imageUrl = imageUrl;
        this.consumerId = consumerId;
        this.profileImage = profileImage;
        this.nickname = nickname;
        this.storeId = storeId;
        this.storeName = storeName;
        this.createdAt = createdAt;
    }

    public static GetReviewConsumerResponse from (Review review) {

        return builder()
                .reviewId(review.getId())
                .content(review.getContent())
                .imageUrl(review.getImageUrl())
                .consumerId(review.getConsumer().getId())
                .profileImage(review.getConsumer().getProfileImage())
                .nickname(review.getConsumer().getNickname())
                .storeId(review.getStore().getId())
                .storeName(review.getStore().getName())
                .createdAt(getDate(review.getCreatedAt()))
                .build();
    }

    private static String getDate(LocalDateTime localDateTime) {

        StringBuilder sb =  new StringBuilder();

        String date = localDateTime.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
        String dayOfWeek = localDateTime.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN);

        sb.append(date).append("(").append(dayOfWeek).append(")");
        return sb.toString();
    }
}
