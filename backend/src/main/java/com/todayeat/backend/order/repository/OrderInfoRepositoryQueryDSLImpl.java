package com.todayeat.backend.order.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationWeekResponse;
import com.todayeat.backend._common.statistic.dto.response.GetSellerRegistrationWeekResponse.SaleStatistic;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import com.todayeat.backend.order.entity.QOrderInfo;
import com.todayeat.backend.order.entity.QOrderInfoItem;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static com.querydsl.core.types.Projections.fields;

@RequiredArgsConstructor
public class OrderInfoRepositoryQueryDSLImpl implements OrderInfoRepositoryQueryDSL {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public GetSellerRegistrationWeekResponse findRegistrationWeekByStoreId(Long storeId) {

        QOrderInfo orderInfo = QOrderInfo.orderInfo;
        QOrderInfoItem orderInfoItem = QOrderInfoItem.orderInfoItem;

        return GetSellerRegistrationWeekResponse.of(jpaQueryFactory
                .select(fields(
                        SaleStatistic.class,
                        orderInfoItem.name.as("menuName"),
                        orderInfoItem.quantity.sum().as("saleStatistic")))
                .from(orderInfo)
                .leftJoin(orderInfoItem).on(orderInfo.id.eq(orderInfoItem.orderInfo.id))
                .where(orderInfo.store.id.eq(storeId)
                        .and(orderInfo.status.eq(OrderInfoStatus.FINISHED))
                        .and(orderInfo.createdAt.after(LocalDateTime.now().minusDays(7))))
                .groupBy(orderInfoItem.name)
                .fetch());
    }
}
