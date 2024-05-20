package com.todayeat.backend.order.repository;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long>, OrderInfoRepositoryQueryDSL {

    Optional<OrderInfo> findByIdAndDeletedAtIsNull(Long orderInfoId);

    // 주문 존재 여부, 가게의 주문이 맞는지 여부, 내 주문이 맞는지 여부, 주문 상태가 FINISHED 인지, 이미 리뷰 작성했는지 여부
    Optional<OrderInfo> findByIdAndStoreAndConsumerAndStatusAndReviewIsNull(Long id, Store store, Consumer consumer, OrderInfoStatus orderInfoStatus);

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

    @Query("select o from OrderInfo o " +
            "join fetch o.store s " +
            "where o.store.id = :storeId " +
            "and o.status in :statusList " +
            "and o.orderNo like %:orderNo% " +
            "and o.deletedAt is null")
    Slice<OrderInfo> findAllByStoreIdAndStatusAndOrderNoAndDeletedAtIsNull(Long storeId, List<OrderInfoStatus> statusList, String orderNo, Pageable pageable);
}
