package com.todayeat.backend.review.service;

import com.todayeat.backend._common.entity.DirectoryType;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import com.todayeat.backend.order.repository.OrderInfoRepository;
import com.todayeat.backend.review.dto.request.CreateReviewRequest;
import com.todayeat.backend.review.entity.Review;
import com.todayeat.backend.review.mapper.ReviewMapper;
import com.todayeat.backend.review.repository.ReviewRepository;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final SecurityUtil securityUtil;
    private final ReviewRepository reviewRepository;
    private final StoreRepository storeRepository;
    private final OrderInfoRepository orderInfoRepository;
    private final S3Util s3Util;

    @Transactional
    public void create(CreateReviewRequest request) {

        Consumer consumer = securityUtil.getConsumer();

        // 가게가 존재 여부 확인
        Store store = storeRepository.findByIdAndDeletedAtIsNull(request.getStoreId())
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND));

        // 주문 존재 여부, 가게의 주문이 맞는지 여부, 내 주문이 맞는지 여부, 주문 상태가 FINISHED 인지, 이미 리뷰 작성했는지 여부
        OrderInfo orderInfo = orderInfoRepository
                .findByIdAndStoreAndConsumerAndStatusAndReviewIsNull(request.getOrderInfoId(),
                        store, consumer, OrderInfoStatus.FINISHED)
                .orElseThrow(() -> new BusinessException(ErrorType.ORDER_NOT_FOUND));

        // S3에 이미지 저장
        String  imageUrl = s3Util.uploadImageIfPresent(request.getImage(), DirectoryType.CONSUMER_REVIEW_IMAGE, consumer.getId());

        try {
            Review review = ReviewMapper.INSTANCE
                    .createReviewRequestToMenu(request, imageUrl, consumer, store);

            reviewRepository.save(review);

            orderInfo.saveReview(review);

            orderInfoRepository.save(orderInfo);
        } catch (RuntimeException e) {

            s3Util.deleteImageIfPresent(imageUrl);

            throw new RuntimeException(e);
        }
    }

}
