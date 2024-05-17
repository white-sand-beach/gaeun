package com.todayeat.backend._common.notification.repository;

import com.todayeat.backend._common.notification.entity.ConsumerNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumerNotificationRepository extends JpaRepository<ConsumerNotification, Long> {
}
