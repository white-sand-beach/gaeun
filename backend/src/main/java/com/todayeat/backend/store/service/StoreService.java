package com.todayeat.backend.store.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.category.entity.StoreCategory;
import com.todayeat.backend.category.mapper.CategoryMapper;
import com.todayeat.backend.category.mapper.StoreCategoryMapper;
import com.todayeat.backend.category.repository.CategoryRepository;
import com.todayeat.backend.category.repository.StoreCategoryRepository;
import com.todayeat.backend.location.entity.Coordinate;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.repository.SellerRepository;
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

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.todayeat.backend._common.entity.DirectoryType.SELLER_STORE_IMAGE;
import static com.todayeat.backend._common.response.error.ErrorType.CATEGORY_NOT_FOUND;
import static com.todayeat.backend._common.response.error.ErrorType.STORE_NOT_FOUND;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreService {

    private final StoreCategoryRepository storeCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final SellerRepository sellerRepository;
    private final StoreRepository storeRepository;

    private final SecurityUtil securityUtil;
    private final S3Util s3Util;

    @Transactional
    public void create(CreateStoreRequest createStoreRequest) {

        Seller seller = securityUtil.getSeller();
        Store store = storeRepository.save(StoreMapper.INSTANCE.createStoreRequestToStore(createStoreRequest, seller.getId(), s3Util));

        seller.updateStore(store);
        sellerRepository.save(seller);

        createStoreRequest.getCategoryIdList().stream()
                .map(categoryId -> categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new BusinessException(CATEGORY_NOT_FOUND)))
                .map(category -> StoreCategoryMapper.INSTANCE.toStoreCategory(store, category))
                .forEach(storeCategoryRepository::save);
    }

    public GetSellerStoreResponse getSellerStore(Long storeId) {

        Store store = securityUtil.getSeller().getStore();

        if (store == null || !Objects.equals(store.getId(), storeId)) {

            throw new BusinessException(STORE_NOT_FOUND);
        }

        GetSellerStoreResponse getSellerStoreResponse = StoreMapper.INSTANCE.storeToGetSellerStoreResponse(store);

        getSellerStoreResponse.setCategoryList(
                categoryRepository.findAll().stream()
                        .map(CategoryMapper.INSTANCE::categoryToCategoryInfo)
                        .collect(Collectors.toList()));

        return getSellerStoreResponse;
    }

    public GetConsumerInfoStoreResponse getConsumerInfoStore(Long storeId) {

        GetConsumerInfoStoreResponse getStoreConsumerResponse = StoreMapper.INSTANCE.storeToGetConsumerStoreResponse(
                validateAndGetStore(storeId));

        //todo getDetailStoreConsumerResponse에 찜 여부 넣어야 함

        return getStoreConsumerResponse;
    }

    public GetConsumerDetailStoreResponse getConsumerDetailStore(Long storeId) {

        return StoreMapper.INSTANCE.storeToGetConsumerDetailStoreResponse(
                validateAndGetStore(storeId));
    }

    @Transactional
    public void update(Long storeId, UpdateStoreRequest updateStoreRequest) {

        Store store = securityUtil.getSeller().getStore();

        if (store == null || !Objects.equals(store.getId(), storeId)) {

            throw new BusinessException(STORE_NOT_FOUND);
        }

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
        storeRepository.save(store);

        List<StoreCategory> existingCategories = storeCategoryRepository.findByStoreIdAndDeletedAtIsNull(storeId);
        Set<Long> existingCategoryIds = existingCategories.stream()
                .map(sc -> sc.getCategory().getId())
                .collect(Collectors.toSet());

        existingCategories.stream()
                .filter(sc -> !updateStoreRequest.getCategoryIdList().contains(sc.getCategory().getId()))
                .forEach(storeCategoryRepository::delete);

        updateStoreRequest.getCategoryIdList().stream()
                .filter(id -> !existingCategoryIds.contains(id))
                .forEach(id -> storeCategoryRepository.save(
                        StoreCategoryMapper.INSTANCE.toStoreCategory(store, categoryRepository.findById(id).get())));
    }

    @Transactional
    public void updateIsOpened(Long storeId) {

        Store store = securityUtil.getSeller().getStore();

        if (store == null || !Objects.equals(store.getId(), storeId)) {

            throw new BusinessException(STORE_NOT_FOUND);
        }

        store.updateIsOpened();
    }

    private Store validateAndGetStore(Long storeId) {
        return storeRepository.findByIdAndDeletedAtIsNull(storeId)
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));
    }
}
