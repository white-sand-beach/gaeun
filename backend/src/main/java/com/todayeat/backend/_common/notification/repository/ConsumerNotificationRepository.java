package com.todayeat.backend._common.notification.repository;

import com.todayeat.backend._common.notification.entity.ConsumerNotification;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ConsumerNotificationRepository extends JpaRepository<ConsumerNotification, Long> {

    Slice<ConsumerNotification> findAllByConsumerIdAndDeletedAtIsNull(Long consumerId, Pageable pageable);

    @Query("SELECT COUNT(cn) FROM ConsumerNotification cn " +
            "WHERE cn.consumer.id = :consumerId " +
            "AND cn.isRead = false " +
            "AND cn.deletedAt is null")
    long countByIsReadFalse(@Param("consumerId") Long consumerId);

    Optional<ConsumerNotification> findByIdAndDeletedAtIsNull(Long Id);

}
