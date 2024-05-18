package com.todayeat.backend._common.notification.service;

import com.todayeat.backend._common.notification.dto.CreateOrderNotification;
import com.todayeat.backend._common.notification.dto.CreateReviewNotification;
import com.todayeat.backend._common.notification.dto.response.GetSellerNotificationCountResponse;
import com.todayeat.backend._common.notification.dto.response.GetSellerNotificationListResponse;
import com.todayeat.backend._common.notification.dto.response.GetSellerNotificationResponse;
import com.todayeat.backend._common.notification.entity.SellerNotification;
import com.todayeat.backend._common.notification.repository.SellerNotificationRepository;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.seller.entity.Seller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SellerNotificationService {

    private final SellerNotificationRepository sellerNotificationRepository;
    private final SecurityUtil securityUtil;

    @Transactional
    public void createOrderNotification(CreateOrderNotification createDTO) {

        Seller seller = securityUtil.getSeller();

        sellerNotificationRepository.save(SellerNotification.of(createDTO.getType(),
                createDTO.getTypeId(), createDTO.getContent(), seller));
    }

    @Transactional
    public void createReviewNotification(CreateReviewNotification createDTO) {

        sellerNotificationRepository.save(SellerNotification.of(createDTO.getType(),
                createDTO.getReviewId(), createDTO.getContent(), createDTO.getSeller()));

    }

    public GetSellerNotificationListResponse getList(Integer page, Integer size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Seller seller = securityUtil.getSeller();

        Slice<SellerNotification> notificationList = sellerNotificationRepository.findAllBySellerIdAndDeletedAtIsNull(seller.getId(), pageable);

        return GetSellerNotificationListResponse.of(
                notificationList.getContent().stream().map(GetSellerNotificationResponse::from)
                        .collect(Collectors.toList()),
                notificationList.getNumber(),
                notificationList.hasNext()
        );
    }

    @Transactional
    public GetSellerNotificationCountResponse getCount() {
        Seller seller = securityUtil.getSeller();

        return GetSellerNotificationCountResponse.of(sellerNotificationRepository.countByIsReadFalse(seller.getId()));
    }

    @Transactional
    public void isReadTrue(Long sellerNotificationId) {

        SellerNotification sellerNotification = sellerNotificationRepository.findByIdAndDeletedAtIsNull(sellerNotificationId)
                .orElseThrow(() -> new BusinessException(ErrorType.NOTIFICATION_NOT_FOUND));

        sellerNotification.isReadTrue();
    }
}
