package com.todayeat.backend.favorite.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.favorite.dto.request.CreateFavoriteRequest;
import com.todayeat.backend.favorite.dto.request.DeleteFavoriteRequest;
import com.todayeat.backend.favorite.dto.response.GetFavoriteResponse;
import com.todayeat.backend.favorite.dto.response.GetFavoriteListResponse;
import com.todayeat.backend.favorite.entity.Favorite;
import com.todayeat.backend.favorite.mapper.FavoriteMapper;
import com.todayeat.backend.favorite.repository.FavoriteRepository;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.repository.StoreRepository;
import com.todayeat.backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final StoreRepository storeRepository;
    private final StoreService storeService;
    private final SecurityUtil securityUtil;

    @Transactional
    public void create(CreateFavoriteRequest request) {

        // 소비자
        Consumer consumer = securityUtil.getConsumer();

        // 가게
        Store store = findStoreOrElseThrow(request.getStoreId());

        // 찜이 이미 존재
        if (favoriteRepository.existsByConsumerAndStoreAndDeletedAtIsNull(consumer, store)) {
            throw new BusinessException(FAVORITE_CONFLICT);
        }

        // 저장
        favoriteRepository.save(FavoriteMapper.INSTANCE.toFavorite(consumer, store));

        // 가게 찜 수 증가
        storeService.updateFavoriteCnt(store, 1);
    }

    @Transactional
    public void deleteByFavoriteId(Long favoriteId) {

        // 소비자
        Consumer consumer = securityUtil.getConsumer();

        // 찜
        Favorite favorite = favoriteRepository.findByIdAndDeletedAtIsNull(favoriteId)
                .filter(f -> f.getConsumer().getId().equals(consumer.getId()))
                .orElseThrow(() -> new BusinessException(FAVORITE_NOT_FOUND));

        // 가게 찜 수 감소
        storeService.updateFavoriteCnt(favorite.getStore(), -1);

        // 삭제
        favoriteRepository.delete(favorite);
    }

    @Transactional
    public void deleteByStoreId(DeleteFavoriteRequest request) {

        // 소비자
        Consumer consumer = securityUtil.getConsumer();

        // 가게
        Store store = findStoreOrElseThrow(request.getStoreId());

        // 찜
        Favorite favorite = favoriteRepository.findByStoreIdAndConsumerIdAndDeletedAtIsNull(request.getStoreId(), consumer.getId())
                .orElseThrow(() -> new BusinessException(FAVORITE_NOT_FOUND));

        // 가게 찜 수 감소
        storeService.updateFavoriteCnt(store, -1);

        // 삭제
        favoriteRepository.delete(favorite);
    }

    public GetFavoriteListResponse getList(Integer page, Integer size) {

        Consumer consumer = securityUtil.getConsumer();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        // 찜 가져오기
        Page<Favorite> favorites = favoriteRepository.findAllByConsumerAndDeletedAtIsNull(consumer, pageable);

        // dto 변환
        List<GetFavoriteResponse> getFavoriteResponses = favorites.stream().map(FavoriteMapper.INSTANCE::toGetFavoriteResponse).toList();

        return FavoriteMapper.INSTANCE.toGetFavoriteListResponse(
                getFavoriteResponses,
                favorites.getTotalElements(),
                favorites.getNumber(),
                favorites.hasNext()
        );
    }

    private Store findStoreOrElseThrow(Long storeId) {

        return storeRepository.findByIdAndDeletedAtIsNull(storeId)
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));
    }
}
