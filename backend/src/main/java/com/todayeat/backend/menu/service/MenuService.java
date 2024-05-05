package com.todayeat.backend.menu.service;

import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.menu.dto.CreateMenuRequest;
import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.menu.mapper.MenuMapper;
import com.todayeat.backend.menu.repository.MenuRepository;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuService {

    private final SecurityUtil securityUtil;
    private final MenuRepository menuRepository;
    private final StoreRepository storeRepository;

    @Transactional
    public void create(CreateMenuRequest request) {

        Seller seller = securityUtil.getSeller();

        //판매자의 가게가 맞는지 확인
        if (seller.getStore() == null || !Objects.equals(seller.getStore().getId(), request.getStoreId()))
            throw new BusinessException(ErrorType.STORE_NOT_FOUND);

        //가게 존재 여부 확인
        Store store = storeRepository
                .findByIdAndDeletedAtIsNull(request.getStoreId())
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND));

        Menu menu = MenuMapper.INSTANCE
                .createMenuRequestToMenu(request, getDiscountRate(request.getOriginalPrice(), request.getSellPrice()), store);

        menuRepository.save(menu);
    }

    //할인률 계산
    private Integer getDiscountRate(Integer originalPrice, Integer sellPrice) {

        if(originalPrice == 0)
            throw new BusinessException(ErrorType.MENU_ORIGINAL_PRICE_BAD_REQUEST);

        return 100 * (originalPrice - sellPrice) / originalPrice;
    }
}
