package com.todayeat.backend._common.notification.repository;

import com.todayeat.backend._common.notification.entity.SellerNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerNotificationRepository extends JpaRepository<SellerNotification, Long> {
}
