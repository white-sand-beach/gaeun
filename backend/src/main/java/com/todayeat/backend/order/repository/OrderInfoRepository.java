package com.todayeat.backend.order.repository;

import com.todayeat.backend.order.entity.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long> {

}
