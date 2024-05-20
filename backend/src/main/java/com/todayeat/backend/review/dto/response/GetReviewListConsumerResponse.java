package com.todayeat.backend.review.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetReviewListConsumerResponse", description = "소비자 내 리뷰 목록 조회 응답")
public class GetReviewListConsumerResponse {

    @Schema(description = "리뷰 정보")
    private List<GetReviewConsumerResponse> reviewList;

    @Schema(description = "현재 페이지", example = "0")
    private Integer page;

    @Schema(description = "다음 페이지 존재 여부", example = "true")
    private Boolean hasNext;

    @Schema(description = "총 리뷰 개수", example = "50")
    private Long totalCnt;

    @Builder
    private GetReviewListConsumerResponse(List<GetReviewConsumerResponse> reviewList, Integer page, Boolean hasNext, Long totalCnt) {
        this.reviewList = reviewList;
        this.page = page;
        this.hasNext = hasNext;
        this.totalCnt = totalCnt;
    }

    public static GetReviewListConsumerResponse of(List<GetReviewConsumerResponse> reviewList, Integer page, Boolean hasNext, Long totalCnt) {

        return builder()
                .reviewList(reviewList)
                .page(page)
                .hasNext(hasNext)
                .totalCnt(totalCnt)
                .build();
    }
}
