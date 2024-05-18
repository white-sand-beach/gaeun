package com.todayeat.backend.review.service;

import com.todayeat.backend._common.entity.DirectoryType;
import com.todayeat.backend._common.notification.dto.CreateReviewNotification;
import com.todayeat.backend._common.notification.service.ConsumerNotificationService;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.FCMNotificationUtil;
import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import com.todayeat.backend.order.repository.OrderInfoRepository;
import com.todayeat.backend.review.dto.request.CreateReviewRequest;
import com.todayeat.backend.review.dto.response.GetReviewConsumerResponse;
import com.todayeat.backend.review.dto.response.GetReviewListConsumerResponse;
import com.todayeat.backend.review.entity.Review;
import com.todayeat.backend.review.mapper.ReviewMapper;
import com.todayeat.backend.review.repository.ReviewRepository;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.repository.SellerRepository;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.repository.StoreRepository;
import com.todayeat.backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final SecurityUtil securityUtil;
    private final ReviewRepository reviewRepository;
    private final StoreRepository storeRepository;
    private final SellerRepository sellerRepository;
    private final OrderInfoRepository orderInfoRepository;
    private final S3Util s3Util;
    private final FCMNotificationUtil fcmNotificationUtil;

    private final ConsumerNotificationService consumerNotificationService;
    private final StoreService storeService;

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
        String imageUrl = s3Util.uploadImageIfPresent(request.getImage(), DirectoryType.CONSUMER_REVIEW_IMAGE, consumer.getId());

        Review review = ReviewMapper.INSTANCE
                .createReviewRequestToReview(request, imageUrl, consumer, store);

        try {
            review = reviewRepository.save(review);

            orderInfo.saveReview(review);
            orderInfoRepository.save(orderInfo);

            // 리뷰수 증가 반영
            storeService.updateReviewCnt(store, 1);
        } catch (RuntimeException e) {

            s3Util.deleteImageIfPresent(imageUrl);

            throw new RuntimeException(e);
        }

        // todo 한 트랜잭션에 안 묶이게 수정하기
        CreateReviewNotification createReviewNotification = CreateReviewNotification.of(review.getId(), consumer.getNickname());
        consumerNotificationService.create(createReviewNotification);

        // 알림 보내기
        Optional<Seller> seller = sellerRepository.findByStoreAndDeletedAtIsNull(store);

        if (seller.isEmpty()) {
            log.error("ReviewService: Review create notification fail becasue of no such seller");
        } else {
            fcmNotificationUtil.sendToOne(seller.get().getId(), "Seller", "편지 알림", createReviewNotification.getBody());
        }
    }

    // 소비자: 자신의 리뷰 목록 보기
    public GetReviewListConsumerResponse getListConsumer(Integer page, Integer size, Long storeId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Consumer consumer = securityUtil.getConsumer();


        Page<Review> reviewList = reviewRepository
                .findAllByStoreIdAndConsumerId(storeId, consumer.getId(), pageable);

        return GetReviewListConsumerResponse.of(
                reviewList.getContent().stream().map(GetReviewConsumerResponse::from)
                        .collect(Collectors.toList()),
                reviewList.getNumber(),
                reviewList.hasNext(),
                reviewList.getTotalElements()
        );
    }

}
