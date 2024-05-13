package com.todayeat.backend.store.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.todayeat.backend.category.dto.CategoryInfo;
import com.todayeat.backend.category.entity.QCategory;
import com.todayeat.backend.category.entity.QStoreCategory;
import com.todayeat.backend.seller.entity.Location;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse.StoreInfo;
import com.todayeat.backend.store.entity.QStore;
import com.todayeat.backend.store.entity.Store;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

import static com.querydsl.core.types.Projections.fields;

@RequiredArgsConstructor
public class StoreRepositoryQueryDSLImpl implements StoreRepositoryQueryDSL {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public GetConsumerListStoreResponse findStoreList(Location location, Integer radius, String keyword, Long categoryId, Pageable pageable) {

        QStore store = QStore.store;
        QStoreCategory storeCategory = QStoreCategory.storeCategory;
        QCategory category = QCategory.category;

        JPAQuery<StoreInfo> query = jpaQueryFactory
                .select(fields(
                        StoreInfo.class,
                        store.id.as("storeId"),
                        store.address,
                        store.roadAddress,
                        store.location.lat.as("latitude"),
                        store.location.lon.as("longitude"),
                        store.name,
                        store.operatingTime,
                        store.reviewCnt,
                        store.favoriteCnt,
                        Expressions.numberTemplate(Double.class,
                                        "haversine({0}, {1}, {2}, {3})",
                                        store.location.lat,
                                        store.location.lon,
                                        Expressions.constant(location.getLat()),
                                        Expressions.constant(location.getLon()))
                                .as("distance")))
                .from(store)
                .where(store.isOpened.isTrue()
                        .and(Expressions.numberTemplate(Double.class,
                                        "haversine({0}, {1}, {2}, {3})",
                                        store.location.lat,
                                        store.location.lon,
                                        Expressions.constant(location.getLat()),
                                        Expressions.constant(location.getLon()))
                                .loe(radius.doubleValue())));

        if (categoryId != null) {

            query
                    .join(storeCategory).on(storeCategory.store.id.eq(store.id))
                    .where(storeCategory.category.id.eq(categoryId));
        }

        query.offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1);

        for (Sort.Order order : pageable.getSort()) {
            PathBuilder<Store> entityPath = new PathBuilder<>(Store.class, "store");
            OrderSpecifier<?> orderSpecifier;

            switch (order.getProperty()) {
                case "distance":
                    orderSpecifier = Expressions.numberTemplate(Double.class,
                                    "haversine({0}, {1}, {2}, {3})",
                                    store.location.lat,
                                    store.location.lon,
                                    Expressions.constant(location.getLat()),
                                    Expressions.constant(location.getLon()))
                            .asc();
                    break;
                case "reviewCnt":
                    orderSpecifier = new OrderSpecifier<>(Order.DESC, entityPath.getNumber("reviewCnt", Integer.class));
                    break;
                case "favoriteCnt":
                    orderSpecifier = new OrderSpecifier<>(Order.DESC, entityPath.getNumber("favoriteCnt", Integer.class));
                    break;
                default:
                    throw new IllegalArgumentException("Invalid property for sorting: " + order.getProperty());
            }

            query.orderBy(orderSpecifier);
        }

        List<StoreInfo> storeInfos = query.offset(pageable.getOffset()).limit(pageable.getPageSize() + 1).fetch();

        for (StoreInfo info : storeInfos) {
            List<CategoryInfo> categories = jpaQueryFactory
                    .select(Projections.fields(
                            CategoryInfo.class,
                            category.id.as("categoryId"),
                            category.name,
                            category.imageURL
                    ))
                    .from(storeCategory)
                    .join(storeCategory.category, category)
                    .where(storeCategory.store.id.eq(info.getStoreId()))
                    .fetch();

            for (CategoryInfo o : categories) {
                System.out.println(o.getName());
            }

            info.setCategoryList(categories);
        }

        // todo 메뉴 리스트 추가 해야 함

        boolean hasNext = false;
        if (storeInfos.size() > pageable.getPageSize()) {
            storeInfos.remove(pageable.getPageSize());
            hasNext = true;
        }

        return GetConsumerListStoreResponse.of(storeInfos, pageable.getPageSize(), hasNext);
    }
}
