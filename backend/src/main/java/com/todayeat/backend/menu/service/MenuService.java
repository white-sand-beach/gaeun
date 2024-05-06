package com.todayeat.backend.menu.service;

import com.todayeat.backend._common.entity.DirectoryType;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.menu.dto.request.CreateMenuRequest;
import com.todayeat.backend.menu.dto.request.DeleteMenuRequest;
import com.todayeat.backend.menu.dto.request.UpdateMenuRequest;
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

import javax.sql.DataSource;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuService {

    private final SecurityUtil securityUtil;
    private final MenuRepository menuRepository;
    private final SellerRepository sellerRepository;
    private final S3Util s3Util;

    @Transactional
    public void create(CreateMenuRequest request) {

        Seller seller = securityUtil.getSeller();

        // 판매자의 가게가 맞는지 확인, 가계 존재 여부 확인
        Store store = validateStoreAndSeller(seller, request.getStoreId());

        // S3에 이미지 저현
        String imageUrl = s3Util.uploadImage(request.getImage(), DirectoryType.SELLER_MENU_IMAGE, seller.getId());

        Menu menu = MenuMapper.INSTANCE
                .createMenuRequestToMenu(request, imageUrl, getDiscountRate(request.getOriginalPrice(), request.getSellPrice()), store);

        try {
            menuRepository.save(menu);
        } catch (RuntimeException e) {
            s3Util.deleteImage(imageUrl);
            throw new RuntimeException(e);
        }
    }

    public GetMenusResponse getMenusResponse(Long storeId) {

        Seller seller = securityUtil.getSeller();

        // 판매자의 가게가 맞는지 확인, 가계 존재 여부 확인
        Store store = validateStoreAndSeller(seller, storeId);

        List<GetMenuResponse> menus = menuRepository.findAllByStoreAndDeletedAtIsNullOrderBySequenceAscUpdatedAtDesc(store)
                .stream().map(MenuMapper.INSTANCE::getMenuResponse)
                .toList();

        return GetMenusResponse.of(store.getId(), menus, menus.size());
    }

    @Transactional
    public void update(Long menuId, UpdateMenuRequest request) {

        Seller seller = securityUtil.getSeller();

        // 판매자의 가게가 맞는지 확인, 가계 존재 여부 확인
        Store store = validateStoreAndSeller(seller, request.getStoreId());

        // 메뉴 존재 여부 확인
        Menu menu = menuRepository.findByIdAndDeletedAtIsNull(menuId)
                .orElseThrow(() -> new BusinessException(ErrorType.MENU_NOT_FOUND));

        menu.update(request.getImageUrl(), request.getName(), request.getOriginalPrice(), request.getSellPrice(),
                getDiscountRate(request.getOriginalPrice(), request.getSellPrice()), request.getSequence());
    }

    @Transactional
    public void delete(Long menuId, DeleteMenuRequest request) {

        Seller seller = securityUtil.getSeller();

        // 판매자의 가게가 맞는지 확인, 가계 존재 여부 확인
        Store store = validateStoreAndSeller(seller, request.getStoreId());

        // 메뉴 존재 여부 확인
        Menu menu = menuRepository.findByIdAndDeletedAtIsNull(menuId)
                .orElseThrow(() -> new BusinessException(ErrorType.MENU_NOT_FOUND));

        // 메뉴 이미지 url
        String imageUrl = menu.getImageUrl();

        menuRepository.delete(menu);

        s3Util.deleteImage(imageUrl);
    }

    // 판매자의 가게가 맞는지 확인, 가계 존재 여부 확인
    private Store validateStoreAndSeller(Seller seller, Long storeId) {

        return sellerRepository.findByIdAndStoreIdAndDeletedAtIsNullAndStoreDeletedAtIsNull(seller.getId(), storeId)
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND)).getStore();
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
