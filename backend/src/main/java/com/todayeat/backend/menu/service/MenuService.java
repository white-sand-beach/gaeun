package com.todayeat.backend.menu.service;

import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.menu.dto.request.CreateMenuRequest;
import com.todayeat.backend.menu.dto.response.GetMenuResponse;
import com.todayeat.backend.menu.dto.response.GetMenusResponse;
import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.menu.mapper.MenuMapper;
import com.todayeat.backend.menu.repository.MenuRepository;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.repository.SellerRepository;
import com.todayeat.backend.store.entity.Store;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

import static com.todayeat.backend._common.response.error.ErrorType.STORE_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuService {

    private final SecurityUtil securityUtil;
    private final MenuRepository menuRepository;
    private final SellerRepository sellerRepository;

    @Transactional
    public void create(CreateMenuRequest request) {

        // 판매자의 가게가 맞는지 확인
        Store store = validateStoreAndSeller(request.getStoreId());

        Menu menu = MenuMapper.INSTANCE
                .createMenuRequestToMenu(request, getDiscountRate(request.getOriginalPrice(), request.getSellPrice()), store);

        menuRepository.save(menu);
    }

    public GetMenusResponse getMenusResponse(Long storeId) {

        // 판매자의 가게가 맞는지 확인
        Store store = validateStoreAndSeller(storeId);

        List<GetMenuResponse> menus = menuRepository.findAllByStoreAndDeletedAtIsNullOrderBySequenceAscUpdatedAtDesc(store)
                .stream().map(MenuMapper.INSTANCE::getMenuResponse)
                .toList();

        return GetMenusResponse.of(store.getId(), menus, menus.size());
    }

    // 판매자의 가게가 맞는지 확인
    private Store validateStoreAndSeller(Long storeId) {

//        Seller seller = securityUtil.getSeller();
//
//        return sellerRepository.findByIdAndStoreIdAndDeletedAtIsNullAndStoreDeletedAtIsNull(seller.getId(), storeId)
//                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND)).getStore();

        Store store = securityUtil.getSeller().getStore();

        if (store == null || !Objects.equals(store.getId(), storeId)) {

            throw new BusinessException(STORE_NOT_FOUND);
        }

        return store;
    }

    // 할인률 계산
    private Integer getDiscountRate(Integer originalPrice, Integer sellPrice) {

        // 판매가가 원가보다 큰 경우 예외
        if(originalPrice < sellPrice) {
            throw new BusinessException(ErrorType.MENU_CREATE_FAIL);
        }

        if (originalPrice == 0) {
            throw new BusinessException(ErrorType.MENU_GET_DISCOUNT_RATE_FAIL);
        }

        return 100 * (originalPrice - sellPrice) / originalPrice;
    }
}
