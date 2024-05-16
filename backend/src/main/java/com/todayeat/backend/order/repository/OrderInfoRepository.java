package com.todayeat.backend.order.repository;

import com.todayeat.backend.order.entity.OrderInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long> {

    Optional<OrderInfo> findByIdAndDeletedAtIsNull(Long orderInfoId);

    @Query("select o from OrderInfo o " +
            "where o.consumer.id = :consumerId and o.status <> 'UNPAID' and o.deletedAt is null " +
            "order by o.createdAt desc")
    Slice<OrderInfo> findAllByConsumerIdAndStatusIsNotUnpaidAndDeletedAtIsNullOrderByCreatedAtDesc(Long consumerId, Pageable pageable);

    @Query("select o from OrderInfo o " +
            "where o.consumer.id = :consumerId and o.status <> 'UNPAID' and o.store.name like %:keyword% and o.deletedAt is null " +
            "order by o.createdAt desc")
    Slice<OrderInfo> findAllByConsumerIdAndStatusIsNotUnpaidAndKeywordDeletedAtIsNullOrderByCreatedAtDesc(Long consumerId, String keyword, Pageable pageable);

    @Query("select o from OrderInfo o " +
            "where o.store.id = :storeId and o.status = 'FINISHED' and o.deletedAt is null " +
            "order by o.createdAt desc")
    List<OrderInfo> findAllByStoreIdAndStatusIsFinishedAndDeletedAtIsNullOrderByCreatedAtDesc(Long storeId);

    @Query("select o from OrderInfo o " +
            "where o.store.id = :storeId and o.status <> 'FINISHED' and o.deletedAt is null " +
            "order by o.createdAt desc")
    List<OrderInfo> findAllByStoreIdAndStatusIsNotFinishedAndDeletedAtIsNullOrderByCreatedAtDesc(Long storeId);
}
