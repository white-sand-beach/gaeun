package com.todayeat.backend.store.repository;

import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse;
import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.Pageable;

public interface StoreRepositoryQueryDSL {

    GetConsumerListStoreResponse findStoreList(Point location, Integer radius, String keyword, Long categoryId, Pageable pageable);
}
