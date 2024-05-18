package com.todayeat.backend.review.repository;

import com.todayeat.backend.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r " +
            "WHERE (:storeId IS NULL OR r.store.id = :storeId) " +
            "AND r.consumer.id = :consumerId " +
            "AND r.deletedAt is null")
    Page<Review> findAllByStoreIdAndConsumerId(@Param("storeId") Long storeId, @Param("consumerId") Long consumerId, Pageable pageable);
}
