package com.todayeat.backend.store.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.location.entity.Coordinate;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.GetConsumerDetailStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerInfoStoreResponse;
import com.todayeat.backend.store.dto.response.GetSellerStoreResponse;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.mapper.StoreMapper;
import com.todayeat.backend.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.todayeat.backend._common.entity.DirectoryType.SELLER_STORE_IMAGE;
import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    private final SecurityUtil securityUtil;
    private final S3Util s3Util;

    @Transactional
    public void create(CreateStoreRequest createStoreRequest) {

        if (storeRepository.existsByRegisteredNo(createStoreRequest.getRegisteredNo())) {

            throw new BusinessException(STORE_CONFLICT);
        }

        Seller seller = securityUtil.getSeller();
        storeRepository.save(StoreMapper.INSTANCE.createStoreRequestToStore(createStoreRequest, seller, seller.getId(), s3Util));
    }

    public GetSellerStoreResponse getSellerStore(Long storeId) {

        return StoreMapper.INSTANCE.storeToGetSellerStoreResponse(
                storeRepository.findByIdAndDeletedAtIsNull(storeId)
                        .filter(s -> s.getSeller().getId().equals(securityUtil.getSeller().getId()))
                        .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND)));
    }

    public GetConsumerInfoStoreResponse getConsumerInfoStore(Long storeId) {

        GetConsumerInfoStoreResponse getStoreConsumerResponse = StoreMapper.INSTANCE.storeToGetConsumerStoreResponse(
                storeRepository.findByIdAndDeletedAtIsNull(storeId)
                        .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND)));

        //todo getDetailStoreConsumerResponse에 찜 여부 넣어야 함

        return getStoreConsumerResponse;
    }

    public GetConsumerDetailStoreResponse getConsumerDetailStore(Long storeId) {

        return StoreMapper.INSTANCE.storeToGetConsumerDetailStoreResponse(
                storeRepository.findByIdAndDeletedAtIsNull(storeId)
                        .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND)));
    }

    @Transactional
    public void update(Long storeId, UpdateStoreRequest updateStoreRequest) {

        Store store = storeRepository.findByIdAndDeletedAtIsNull(storeId)
                .filter(s -> s.getSeller().getId().equals(securityUtil.getSeller().getId()))
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));

        store.updateStore(
                updateStoreRequest.getRegisteredName(),
                updateStoreRequest.getBossName(),
                Coordinate.of(updateStoreRequest.getAddress(), updateStoreRequest.getLatitude(), updateStoreRequest.getLongitude()),
                updateStoreRequest.getTel(),
                updateStoreRequest.getName(),
                s3Util.uploadImage(updateStoreRequest.getImage(), SELLER_STORE_IMAGE, store.getId()),
                updateStoreRequest.getOperatingTime(),
                updateStoreRequest.getHoliday(),
                updateStoreRequest.getOriginCountry(),
                updateStoreRequest.getIntroduction()
        );
    }

    @Transactional
    public void updateIsOpened(Long storeId) {

        storeRepository.findByIdAndDeletedAtIsNull(storeId)
                .filter(s -> s.getSeller().getId().equals(securityUtil.getSeller().getId()))
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND)).updateIsOpened();
    }
}