package com.todayeat.backend.order.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.todayeat.backend._common.statistic.dto.SaleStatistic;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationMonthResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationWeekResponse;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import com.todayeat.backend.order.entity.QOrderInfo;
import com.todayeat.backend.order.entity.QOrderInfoItem;
import com.todayeat.backend.store.dto.GetStoreSaleCountInfo;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import static com.querydsl.core.types.Projections.fields;

@RequiredArgsConstructor
public class OrderInfoRepositoryQueryDSLImpl implements OrderInfoRepositoryQueryDSL {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public GetSellerRegistrationWeekResponse findRegistrationWeekByStoreId(Long storeId) {

        QOrderInfo orderInfo = QOrderInfo.orderInfo;
        QOrderInfoItem orderInfoItem = QOrderInfoItem.orderInfoItem;

        return GetSellerRegistrationWeekResponse.of(
                getStatisticList(orderInfoItem, orderInfo, storeId, 7));
    }

    @Override
    public GetSellerRegistrationMonthResponse findRegistrationMonthByStoreId(Long storeId) {

        QOrderInfo orderInfo = QOrderInfo.orderInfo;
        QOrderInfoItem orderInfoItem = QOrderInfoItem.orderInfoItem;

        return GetSellerRegistrationMonthResponse.of(
                getStatisticList(orderInfoItem, orderInfo, storeId, 30));
    }

    private List<SaleStatistic> getStatisticList(QOrderInfoItem orderInfoItem, QOrderInfo orderInfo, Long storeId, int days) {

        return jpaQueryFactory
                .select(fields(
                        SaleStatistic.class,
                        orderInfoItem.name.as("menuName"),
                        orderInfoItem.quantity.sum().as("saleStatistic")))
                .from(orderInfo)
                .leftJoin(orderInfoItem).on(orderInfo.id.eq(orderInfoItem.orderInfo.id))
                .where(orderInfo.store.id.eq(storeId)
                        .and(orderInfo.status.eq(OrderInfoStatus.FINISHED))
                        .and(orderInfo.createdAt.after(LocalDateTime.now().minusDays(days))))
                .groupBy(orderInfoItem.name)
                .fetch();
    }

    @Override
    public List<GetStoreSaleCountInfo> countFinishedOrdersByStore(LocalDateTime startDate, LocalDateTime endDate) {

        QOrderInfo orderInfo = QOrderInfo.orderInfo;

        return jpaQueryFactory
                .select(Projections.constructor(
                        GetStoreSaleCountInfo.class,
                        orderInfo.store.id,
                        orderInfo.count()))
                .from(orderInfo)
                .where(orderInfo.status.eq(OrderInfoStatus.FINISHED)
                        .and(orderInfo.createdAt.between(startDate, endDate)))
                .groupBy(orderInfo.store.id)
                .fetch();
    }
}
