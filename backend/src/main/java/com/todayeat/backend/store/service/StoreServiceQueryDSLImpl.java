package com.todayeat.backend.store.service;

import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.category.entity.StoreCategory;
import com.todayeat.backend.category.mapper.CategoryMapper;
import com.todayeat.backend.category.mapper.StoreCategoryMapper;
import com.todayeat.backend.category.repository.CategoryRepository;
import com.todayeat.backend.category.repository.StoreCategoryRepository;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.favorite.repository.FavoriteRepository;
import com.todayeat.backend.seller.entity.Location;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.repository.SellerRepository;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.*;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.mapper.StoreMapper;
import com.todayeat.backend.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.todayeat.backend._common.entity.DirectoryType.SELLER_STORE_IMAGE;
import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreServiceQueryDSLImpl implements StoreService {

    private final StoreCategoryRepository storeCategoryRepository;
    private final FavoriteRepository favoriteRepository;
    private final CategoryRepository categoryRepository;
    private final SellerRepository sellerRepository;
    private final StoreRepository storeRepository;

    private final SecurityUtil securityUtil;
    private final S3Util s3Util;

    @Override
    @Transactional
    public CreateStoreResponse create(CreateStoreRequest createStoreRequest) {

        Seller seller = sellerRepository.findById(securityUtil.getSeller().getId())
                .orElseThrow(() -> new BusinessException(SELLER_NOT_FOUND));

        if (seller.getStore() != null) {

            throw new BusinessException(STORE_CONFLICT);
        }

        String imageURL = imageToURL(createStoreRequest.getImage());

        try {

            Store store = storeRepository.save(
                    StoreMapper.INSTANCE.createStoreRequestToStore(
                            createStoreRequest,
                            Location.of(createStoreRequest.getLatitude(), createStoreRequest.getLongitude()),
                            imageURL));

            seller.updateStore(store);

            createStoreRequest.getCategoryIdList().stream()
                    .map(categoryId -> categoryRepository.findById(categoryId)
                            .orElseThrow(() -> new BusinessException(CATEGORY_NOT_FOUND)))
                    .map(category -> StoreCategoryMapper.INSTANCE.toStoreCategory(store, category))
                    .forEach(storeCategoryRepository::save);

            return StoreMapper.INSTANCE.storeIdToCreateStoreResponse(store.getId());
        } catch (RuntimeException e) {

            s3Util.deleteImageIfPresent(imageURL);
            throw new RuntimeException(e);
        }
    }

    @Override
    public GetSellerStoreResponse getSellerStore(Long storeId) {

        Store store = securityUtil.getSeller().getStore();

        if (store == null || !Objects.equals(store.getId(), storeId)) {

            throw new BusinessException(STORE_NOT_FOUND);
        }

        store = storeRepository.findByIdAndDeletedAtIsNull(store.getId())
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND));

        GetSellerStoreResponse getSellerStoreResponse = StoreMapper.INSTANCE.storeToGetSellerStoreResponse(store, categoryRepository.findAll().stream()
                .map(CategoryMapper.INSTANCE::categoryToCategoryInfo)
                .collect(Collectors.toList()));

        return getSellerStoreResponse;
    }

    @Override
    public GetConsumerInfoStoreResponse getConsumerInfoStore(Long storeId) {

        Consumer consumer = securityUtil.getConsumer();

        Store store = validateAndGetStore(storeId);

        boolean isFavorite = favoriteRepository.existsByConsumerAndStoreAndDeletedAtIsNull(consumer, store);

        return StoreMapper.INSTANCE.storeToGetConsumerStoreResponse(store, isFavorite);
    }

    @Override
    public GetConsumerDetailStoreResponse getConsumerDetailStore(Long storeId) {

        return StoreMapper.INSTANCE.storeToGetConsumerDetailStoreResponse(
                validateAndGetStore(storeId));
    }

    @Override
    public GetConsumerListStoreResponse getConsumerListStore(BigDecimal latitude, BigDecimal longitude, Integer radius, String keyword, Long categoryId, Integer page, Integer size, String sort) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sort));

        return storeRepository.findStoreList(Location.of(latitude, longitude), radius * 1000, keyword, categoryId, pageRequest);
    }

    @Override
    @Transactional
    public void update(Long storeId, UpdateStoreRequest updateStoreRequest) {

        Store store = sellerRepository.findById(securityUtil.getSeller().getId())
                .map(Seller::getStore)
                .filter(s -> s != null && Objects.equals(s.getId(), storeId))
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));

        String imageURL = imageToURL(updateStoreRequest.getImage());

        try {

            StoreMapper.INSTANCE.updateStoreRequestToStore(
                    updateStoreRequest,
                    imageURL,
                    Location.of(updateStoreRequest.getLatitude(), updateStoreRequest.getLongitude()),
                    store);

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
        } catch (RuntimeException e) {

            s3Util.deleteImageIfPresent(imageURL);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public void updateIsOpened(Store store, Boolean isOpened) {

        store.updateIsOpened(isOpened);
    }

    @Override
    @Transactional
    public  void updateSaleCnt(Store store) {

        store.updateSaleCnt();
    }

    @Override
    @Transactional
    public void updateReviewCnt(Store store, int value) {

        store.updateReviewCnt(value);
    }

    @Override
    @Transactional
    public void updateFavoriteCnt(Store store, int value) {

        store.updateFavoriteCnt(value);
    }

    private String imageToURL(MultipartFile image) {

        return s3Util.uploadImageIfPresent(image, SELLER_STORE_IMAGE, securityUtil.getSeller().getId());
    }

    private Store validateAndGetStore(Long storeId) {
        return storeRepository.findByIdAndDeletedAtIsNull(storeId)
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));
    }
}
