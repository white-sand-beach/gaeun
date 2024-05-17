package com.todayeat.backend.store.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.todayeat.backend.category.dto.CategoryInfo;
import com.todayeat.backend.category.entity.QCategory;
import com.todayeat.backend.category.entity.QStoreCategory;
import com.todayeat.backend.sale.entity.QSale;
import com.todayeat.backend.seller.entity.Location;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse.StoreInfo;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse.StoreInfo.SaleImageURL;
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

        QStoreCategory storeCategory = QStoreCategory.storeCategory;
        QCategory category = QCategory.category;
        QStore store = QStore.store;
        QSale sale = QSale.sale;

        JPAQuery<StoreInfo> query = jpaQueryFactory
                .select(fields(
                        StoreInfo.class,
                        store.id.as("storeId"),
                        store.address,
                        store.roadAddress,
                        store.location.lat.as("latitude"),
                        store.location.lon.as("longitude"),
                        store.name,
                        store.imageURL,
                        store.operatingTime,
                        store.reviewCnt,
                        store.favoriteCnt,
                        getIntegerNumberTemplate(location, store)
                                .as("distance")))
                .from(store)
                .leftJoin(storeCategory).on(storeCategory.store.id.eq(store.id))
                .leftJoin(storeCategory.category, category)
                .where(store.isOpened.isTrue()
                        .and(getIntegerNumberTemplate(location, store).loe(radius)));

        if (categoryId != null) {
            query.where(storeCategory.category.id.eq(categoryId));
        }

        if (keyword != null && !keyword.isEmpty()) {
            BooleanExpression keywordCondition = store.name.containsIgnoreCase(keyword)
                    .or(store.introduction.containsIgnoreCase(keyword))
                    .or(category.name.containsIgnoreCase(keyword));

            query.where(keywordCondition);
        }

        query.offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1);

        for (Sort.Order order : pageable.getSort()) {
            PathBuilder<Store> entityPath = new PathBuilder<>(Store.class, "store");
            OrderSpecifier<?> orderSpecifier = switch (order.getProperty()) {
                case "distance" -> getIntegerNumberTemplate(location, store).asc();
                case "saleCnt" -> new OrderSpecifier<>(Order.DESC, entityPath.getNumber("saleCnt", Integer.class));
                case "reviewCnt" -> new OrderSpecifier<>(Order.DESC, entityPath.getNumber("reviewCnt", Integer.class));
                case "favoriteCnt" -> new OrderSpecifier<>(Order.DESC, entityPath.getNumber("favoriteCnt", Integer.class));
                default -> throw new IllegalArgumentException("Invalid property for sorting: " + order.getProperty());
            };

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
                    .where(storeCategory.store.id.eq(info.getStoreId())
                            .and(storeCategory.deletedAt.isNull()))
                    .fetch();

            info.setCategoryList(categories);

            List<SaleImageURL> saleImageURLs = jpaQueryFactory
                    .select(Projections.fields(
                            SaleImageURL.class,
                            sale.imageUrl.as("imageURL")
                    ))
                    .from(sale)
                    .where(sale.store.id.eq(info.getStoreId())
                            .and(sale.isFinished.eq(false))
                            .and(sale.deletedAt.isNull()))
                    .fetch();

            info.setSaleImageURLList(saleImageURLs);
        }

        boolean hasNext = false;
        if (storeInfos.size() > pageable.getPageSize()) {
            storeInfos.remove(pageable.getPageSize());
            hasNext = true;
        }

        return GetConsumerListStoreResponse.of(storeInfos, pageable.getPageSize(), hasNext);
    }

    private static NumberTemplate<Integer> getIntegerNumberTemplate(Location location, QStore store) {
        return Expressions.numberTemplate(Integer.class,
                "haversine({0}, {1}, {2}, {3})",
                store.location.lat,
                store.location.lon,
                Expressions.constant(location.getLat()),
                Expressions.constant(location.getLon()));
    }
}
