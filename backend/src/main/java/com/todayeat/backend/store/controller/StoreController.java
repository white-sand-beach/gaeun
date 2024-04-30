package com.todayeat.backend.store.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.GetDetailStoreConsumerResponse;
import com.todayeat.backend.store.dto.response.GetDetailStoreSellerResponse;
import com.todayeat.backend.store.dto.response.GetInfoStoreResponse;
import com.todayeat.backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

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
    public SuccessResponse<GetDetailStoreConsumerResponse> getDetailConsumer(Long storeId) {

        return SuccessResponse.of(storeService.getDetailConsumer(storeId), GET_STORE_DETAIL_SUCCESS);
    }

    @Override
    public SuccessResponse<GetDetailStoreSellerResponse> getDetailSeller(Long storeId) {

        return SuccessResponse.of(storeService.getDetailSeller(storeId), GET_STORE_DETAIL_SUCCESS);
    }

    @Override
    public SuccessResponse<GetInfoStoreResponse> getInfo(Long storeId) {

        return SuccessResponse.of(storeService.getInfo(storeId), GET_STORE_DETAIL_SUCCESS);
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
