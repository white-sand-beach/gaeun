package com.todayeat.backend.order.repository;

import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long> {

    Optional<OrderInfo> findByIdAndDeletedAtIsNull(Long orderInfoId);

    @Query("select o from OrderInfo o " +
            "join fetch o.consumer c " +
            "where o.consumer.id = :consumerId " +
            "and o.status <> 'UNPAID' " +
            "and o.deletedAt is null")
    Slice<OrderInfo> findAllByConsumerIdAndStatusIsNotUnpaidAndDeletedAtIsNull(Long consumerId, Pageable pageable);

    @Query("select o from OrderInfo o " +
            "join fetch o.consumer c " +
            "where o.consumer.id = :consumerId " +
            "and o.status <> 'UNPAID' " +
            "and o.store.name like %:keyword% " +
            "and o.deletedAt is null")
    Slice<OrderInfo> findAllByConsumerIdAndStatusIsNotUnpaidAndKeywordDeletedAtIsNull(Long consumerId, String keyword, Pageable pageable);

    @Query("select o from OrderInfo o " +
            "join fetch o.store s " +
            "where o.store.id = :storeId " +
            "and o.status in :statusList " +
            "and o.deletedAt is null")
    Slice<OrderInfo> findAllByStoreIdAndStatusAndDeletedAtIsNull(Long storeId, List<OrderInfoStatus> statusList, Pageable pageable);
}
