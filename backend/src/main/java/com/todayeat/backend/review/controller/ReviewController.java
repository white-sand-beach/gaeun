package com.todayeat.backend.review.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.review.dto.request.CreateReviewRequest;
import com.todayeat.backend.review.dto.response.GetReviewListConsumerResponse;
import com.todayeat.backend.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReviewController implements ReviewControllerDocs{

    private final ReviewService reviewService;

    @Override
    public SuccessResponse<Void> create(CreateReviewRequest request) {

        reviewService.create(request);

        return SuccessResponse.of(SuccessType.CREATE_REVIEW_SUCCESS);
    }

    @Override
    public SuccessResponse<GetReviewListConsumerResponse> getListConsumer(Integer page, Integer size, String storeId) {

        return SuccessResponse.of(reviewService.getListConsumer(page, size, storeId == null ? null : Long.valueOf(storeId)), SuccessType.GET_CONSUMER_REVIEW_SUCCESS);
    }
}
