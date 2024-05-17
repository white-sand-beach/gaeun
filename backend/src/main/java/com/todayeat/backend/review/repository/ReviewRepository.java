package com.todayeat.backend.review.repository;

import com.todayeat.backend.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
