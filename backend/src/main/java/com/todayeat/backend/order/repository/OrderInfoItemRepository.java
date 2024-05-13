package com.todayeat.backend.order.repository;

import com.todayeat.backend.order.entity.OrderInfoItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderInfoItemRepository extends JpaRepository<OrderInfoItem, Long> {

    List<OrderInfoItem> findAllByOrderInfoIdAndDeletedAtIsNull(Long orderInfoId);
}
