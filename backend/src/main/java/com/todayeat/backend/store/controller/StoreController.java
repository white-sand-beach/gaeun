package com.todayeat.backend.store.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.GetConsumerDetailStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerInfoStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse;
import com.todayeat.backend.store.dto.response.GetSellerStoreResponse;
import com.todayeat.backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

import static com.todayeat.backend._common.response.success.SuccessType.*;

@RestController
@RequiredArgsConstructor
public class StoreController implements StoreControllerDocs {

    private final StoreService storeService;

    @Override
    public SuccessResponse<Void> create(CreateStoreRequest createStoreRequest) {

        storeService.create(createStoreRequest);
        return SuccessResponse.of(CREATE_STORE_SUCCESS);
    }

    @Override
    public SuccessResponse<GetSellerStoreResponse> getSellerStore(Long storeId) {

        return SuccessResponse.of(storeService.getSellerStore(storeId), GET_STORE_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<GetConsumerInfoStoreResponse> getConsumerInfoStore(Long storeId) {

        return SuccessResponse.of(storeService.getConsumerInfoStore(storeId), GET_STORE_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<GetConsumerDetailStoreResponse> getConsumerDetailStore(Long storeId) {

        return SuccessResponse.of(storeService.getConsumerDetailStore(storeId), GET_STORE_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<GetConsumerListStoreResponse> getConsumerListStore(BigDecimal latitude, BigDecimal longitude, Integer radius, String keyword, Long categoryId, Integer page, Integer size, String sort) {

        return SuccessResponse.of(storeService.getConsumerListStore(latitude, longitude, radius, keyword, categoryId, page, size, sort), GET_STORE_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> update(Long storeId, UpdateStoreRequest updateStoreRequest) {

        storeService.update(storeId, updateStoreRequest);
        return SuccessResponse.of(UPDATE_STORE_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updateIsOpened(Long storeId) {

        storeService.updateIsOpened(storeId);
        return SuccessResponse.of(UPDATE_STORE_SUCCESS);
    }
}
