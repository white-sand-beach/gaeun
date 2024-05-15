package com.todayeat.backend.store.service;

import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.*;
import com.todayeat.backend.store.entity.Store;

import java.math.BigDecimal;

public interface StoreService {

    CreateStoreResponse create(CreateStoreRequest createStoreRequest);

    GetSellerStoreResponse getSellerStore(Long storeId);

    GetConsumerInfoStoreResponse getConsumerInfoStore(Long storeId);

    GetConsumerDetailStoreResponse getConsumerDetailStore(Long storeId);

    GetConsumerListStoreResponse getConsumerListStore(BigDecimal latitude, BigDecimal longitude, Integer radius, String keyword, Long categoryId, Integer page, Integer size, String sort);

    void update(Long storeId, UpdateStoreRequest updateStoreRequest);

    void updateIsOpened(Store store, Boolean isOpened);

    void updateFavoriteCnt(Store store, int value);

    void updateReviewCnt(Store store, int value);
}
