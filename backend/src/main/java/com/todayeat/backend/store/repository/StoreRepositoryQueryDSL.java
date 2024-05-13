package com.todayeat.backend.store.repository;

import com.todayeat.backend.seller.entity.Location;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse;
import org.springframework.data.domain.Pageable;

public interface StoreRepositoryQueryDSL {

    GetConsumerListStoreResponse findStoreList(Location location, Integer radius, String keyword, Long categoryId, Pageable pageable);
}
