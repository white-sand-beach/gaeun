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
import com.todayeat.backend.menu.dto.response.GetMenuListResponse;
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

        // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
        Store store = validateStoreAndSeller(seller, request.getStoreId());

        // S3에 이미지 저장
        String  imageUrl = s3Util.uploadImageIfPresent(request.getImage(), DirectoryType.SELLER_MENU_IMAGE, seller.getId());

        try {
            Menu menu = MenuMapper.INSTANCE
                    .createMenuRequestToMenu(request, imageUrl,
                            getDiscountRate(request.getOriginalPrice(), request.getSellPrice()), store);

            menuRepository.save(menu);
        } catch (RuntimeException e) {

            s3Util.deleteImageIfPresent(imageUrl);

            throw new RuntimeException(e);
        }
    }

    public GetMenuListResponse getMenusResponse(Long storeId) {

        Seller seller = securityUtil.getSeller();

        // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
        Store store = validateStoreAndSeller(seller, storeId);

        List<GetMenuResponse> getMenuResponseList = menuRepository.findAllByStoreAndDeletedAtIsNullOrderByUpdatedAtAsc(store)
                .stream().map(MenuMapper.INSTANCE::getMenuResponse)
                .toList();

        return GetMenuListResponse.of(store.getId(), getMenuResponseList, getMenuResponseList.size());
    }

    @Transactional
    public void update(Long menuId, UpdateMenuRequest request) {

        // 잘못된 이미지 요청
        if (request.getImage() != null && request.getImageUrl() != null) {
            throw new BusinessException(ErrorType.MENU_IMAGE_DUPLICATE);
        }

        Seller seller = securityUtil.getSeller();

        // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
        validateStoreAndSeller(seller, request.getStoreId());

        // 메뉴 존재 여부 확인
        Menu menu = menuRepository.findByIdAndDeletedAtIsNull(menuId)
                .orElseThrow(() -> new BusinessException(ErrorType.MENU_NOT_FOUND));

        // 기존 이미지 유지
        if (request.getImageUrl() != null) {

            if (!menu.getImageUrl().equals(request.getImageUrl())) {
                throw new BusinessException(ErrorType.MENU_IMAGE_URL_BAD_REQUEST);
            }

            // s3 롤백 필요없으니까 더티체킹 가능
            menu.update(request.getName(), request.getOriginalPrice(),
                    request.getSellPrice(), getDiscountRate(request.getOriginalPrice(), request.getSellPrice()));
            return;
        }

        // 기존 이미지 url
        String beforUrl = menu.getImageUrl();

        // 수정 메뉴 이미지 s3에 저장
        String afterUrl = s3Util.uploadImageIfPresent(request.getImage(), DirectoryType.SELLER_MENU_IMAGE, seller.getId());

        try {
            menuRepository.updateMenu(menuId, afterUrl, request.getName(),
                    request.getOriginalPrice(), request.getSellPrice(),
                    getDiscountRate(request.getOriginalPrice(), request.getSellPrice()));
        } catch (RuntimeException e) {

            s3Util.deleteImageIfPresent(afterUrl);

            throw new BusinessException(ErrorType.MENU_UPDATE_FAIL);
        }

        // 기존 메뉴 이미지 삭제
        s3Util.deleteImageIfPresent(beforUrl);
    }

    @Transactional
    public void delete(Long menuId, DeleteMenuRequest request) {

        Seller seller = securityUtil.getSeller();

        // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
        validateStoreAndSeller(seller, request.getStoreId());

        // 메뉴 존재 여부 확인
        Menu menu = menuRepository.findByIdAndDeletedAtIsNull(menuId)
                .orElseThrow(() -> new BusinessException(ErrorType.MENU_NOT_FOUND));

        // 메뉴 이미지 url
        String imageUrl = menu.getImageUrl();

        menuRepository.delete(menu);

        s3Util.deleteImageIfPresent(imageUrl);
    }

    // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
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
