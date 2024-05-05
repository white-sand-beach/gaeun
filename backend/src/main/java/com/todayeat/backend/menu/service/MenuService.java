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
        Store store = storeRepository
                .findByIdAndSellerAndDeletedAtIsNull(request.getStoreId(), seller)
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND));

        Menu menu = MenuMapper.INSTANCE.createMenuRequestToMenu(request, store);

        menuRepository.save(menu);
    }
}
