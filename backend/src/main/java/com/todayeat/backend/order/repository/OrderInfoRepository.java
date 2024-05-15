package com.todayeat.backend.order.repository;

import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long> {

    Optional<OrderInfo> findByIdAndDeletedAtIsNull(Long orderInfoId);

    List<OrderInfo> findAllByConsumerIdAndDeletedAtIsNullOrderByCreatedAtDesc(Long consumerId);

    @Query("select o from OrderInfo o " +
            "where o.store.id = :storeId and o.status = 'FINISHED' and o.deletedAt is null " +
            "order by o.createdAt desc")
    List<OrderInfo> findAllByStoreIdAndStatusIsFinishedAndDeletedAtIsNullOrderByCreatedAtDesc(Long storeId);

    @Query("select o from OrderInfo o " +
            "where o.store.id = :storeId and o.status <> 'FINISHED' and o.deletedAt is null " +
            "order by o.createdAt desc")
    List<OrderInfo> findAllByStoreIdAndStatusIsNotFinishedAndDeletedAtIsNullOrderByCreatedAtDesc(Long storeId);
}
