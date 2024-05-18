package com.todayeat.backend._common.notification.repository;

import com.todayeat.backend._common.notification.entity.SellerNotification;
import com.todayeat.backend.review.entity.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerNotificationRepository extends JpaRepository<SellerNotification, Long> {

    Slice<SellerNotification> findAllBySellerIdAndDeletedAtIsNull(Long sellerId, Pageable pageable);
}
