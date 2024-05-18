package com.todayeat.backend._common.notification.repository;

import com.todayeat.backend._common.notification.entity.SellerNotification;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SellerNotificationRepository extends JpaRepository<SellerNotification, Long> {

    Slice<SellerNotification> findAllBySellerIdAndDeletedAtIsNull(Long sellerId, Pageable pageable);

    @Query("SELECT COUNT(sn) FROM SellerNotification sn " +
            "WHERE sn.seller.id = :sellerId " +
            "AND sn.isRead = false " +
            "AND sn.deletedAt is null")
    long countByIsReadFalse(@Param("sellerId") Long sellerId);

    Optional<SellerNotification> findByIdAndDeletedAtIsNull(Long Id);
}
