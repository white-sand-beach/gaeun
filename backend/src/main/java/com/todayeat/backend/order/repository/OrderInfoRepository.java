package com.todayeat.backend.order.repository;

import com.todayeat.backend.order.entity.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long> {

    Optional<OrderInfo> findByIdAndDeletedAtIsNull(Long orderInfoId);
}
