package com.todayeat.backend.sale.service;

import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.cart.entity.Cart;
import com.todayeat.backend.cart.repository.CartRepository;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.menu.repository.MenuRepository;
import com.todayeat.backend.sale.dto.request.CreateSaleListRequest;
import com.todayeat.backend.sale.dto.request.CreateSaleRequest;
import com.todayeat.backend.sale.dto.request.UpdateSaleIsFinishedAllRequest;
import com.todayeat.backend.sale.dto.request.UpdateSaleRequest;
import com.todayeat.backend.sale.dto.response.*;
import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.sale.mapper.SaleMapper;
import com.todayeat.backend.sale.repository.SaleRepository;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.repository.SellerRepository;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.repository.StoreRepository;
import com.todayeat.backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SaleService {

    private final SecurityUtil securityUtil;
    private final MenuRepository menuRepository;
    private final SellerRepository sellerRepository;
    private final SaleRepository saleRepository;
    private final StoreRepository storeRepository;
    private final CartRepository cartRepository;
    private final StoreService storeService;

    @Transactional
    public void create(CreateSaleListRequest request) {

        // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
        Store store = validateStoreAndSeller(request.getStoreId());

        List<Sale> saleList = new ArrayList<>();

        for (CreateSaleRequest createSaleRequest : request.getSaleList()) {
            // 해당 메뉴의 존재 여부 확인 및 가게에 있는 메뉴인지 확인
            Menu menu = validateMenuAndStore(createSaleRequest.getMenuId(), store);

            saleList.add(
                    SaleMapper.INSTANCE
                            .createSaleReqeustToSale(createSaleRequest,
                                    getDiscountRate(menu.getOriginalPrice(), createSaleRequest.getSellPrice()),
                                    false, 0, store, menu)
            );
        }

        saleRepository.saveAll(saleList);

        storeService.updateIsOpened(store, true);
    }

    public GetSaleListConsumerResponse getListToConsumer(Long storeId) {

        Store store = storeRepository.findByIdAndDeletedAtIsNull(storeId)
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND));

        List<GetSaleConsumerResponse> getSaleToConsumerResponseList = saleRepository.findAllByStoreAndIsFinishedIsFalseAndDeletedAtIsNull(store)
                .stream()
                .map(s -> SaleMapper.INSTANCE.getSaleConsumerResponse(s, s.getStock() - s.getTotalQuantity()))
                .toList();

        return GetSaleListConsumerResponse.of(storeId, getSaleToConsumerResponseList, getSaleToConsumerResponseList.size());
    }

    public GetSaleDetailConsumerResponse getDetailToConsumer(Long saleId) {

        Sale sale = saleRepository.findByIdAndIsFinishedIsFalseAndDeletedAtIsNull(saleId)
                .orElseThrow(() -> new BusinessException(ErrorType.SALE_NOT_SELLING));

        // 내 장바구니 고려한 재고로 바꾸기
        Integer restStock = getRestStock(sale);

        return SaleMapper.INSTANCE.getSaleDetailConsumerResponse(sale, restStock);
    }

    public GetSaleListSellerResponse getListToSeller(Long storeId) {

        // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
        Store store = validateStoreAndSeller(storeId);

        List<GetSaleSellerResponse> getSaleToSellerResponseList = saleRepository.findAllByStoreAndDeletedAtIsNull(store)
                .stream()
                .map(s -> SaleMapper.INSTANCE.getSaleSellerResponse(s, s.getStock() - s.getTotalQuantity()))
                .toList();

        return GetSaleListSellerResponse.of(storeId, getSaleToSellerResponseList, getSaleToSellerResponseList.size());
    }

    @Transactional
    public void update(Long saleId, UpdateSaleRequest request) {

        // todo 쿼리 세개 나가는데 성능 리펙토링 해보기

        // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
        Store store = validateStoreAndSeller(request.getStoreId());

        // 해당 메뉴의 존재 여부 확인 및 가게에 있는 메뉴인지 확인
        Menu menu = validateMenuAndStore(request.getMenuId(), store);

        // 해당 가게의 메뉴인 판매가 있는지 확인
        Sale sale = saleRepository
                .findByIdAndStoreIdAndMenuIdAndDeletedAtIsNullAndStoreDeletedAtIsNullAndMenuDeletedAtIsNull(
                        saleId,
                        store.getId(),
                        menu.getId()
                )
                .orElseThrow(() -> new BusinessException(ErrorType.SALE_CONTENT_UPDATE_FAIL));

        // 재고 검증 및 업데이트. 총 판매량보다 재고가 작은 경우 예외
        if (!sale.update(request.getContent(), request.getIsFinished(), request.getStock())) {
            throw new BusinessException(ErrorType.SALE_STOCK_UPDATE_FAIL);
        }
    }

    @Transactional
    public void updateIsFinishedAll(UpdateSaleIsFinishedAllRequest request) {

        // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
        Store store = validateStoreAndSeller(request.getStoreId());

        saleRepository.updateAllSalesAsFinishedForStore(store);

        store.updateIsOpened(false);
    }

    // 판매자의 가게가 맞는지 확인, 가게 존재 여부 확인
    private Store validateStoreAndSeller(Long storeId) {

        Seller seller = securityUtil.getSeller();

        return sellerRepository.findByIdAndStoreIdAndDeletedAtIsNullAndStoreDeletedAtIsNull(seller.getId(), storeId)
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND)).getStore();
    }

    // 해당 메뉴의 존재 여부 확인 및 가게에 있는 메뉴인지 확인
    private Menu validateMenuAndStore(Long menuId, Store store) {

        return menuRepository.findByIdAndStoreAndDeletedAtIsNullAndStoreDeletedAtIsNull(menuId, store)
                .orElseThrow(() -> new BusinessException(ErrorType.STORE_NOT_FOUND));
    }

    // 할인률 계산
    private Integer getDiscountRate(Integer originalPrice, Integer sellPrice) {

        // 판매가가 원가보다 큰 경우 예외
        if (originalPrice < sellPrice) {
            throw new BusinessException(ErrorType.MENU_CREATE_FAIL);
        }

        if (originalPrice == 0) {
            throw new BusinessException(ErrorType.MENU_GET_DISCOUNT_RATE_FAIL);
        }

        long dif = originalPrice.longValue() - sellPrice.longValue();

        return Math.toIntExact(100 * dif / originalPrice);
    }

    private Integer getRestStock(Sale sale) {
        Consumer consumer = securityUtil.getConsumer();

        Optional<Cart> cart = cartRepository.findByConsumerIdAndSaleId(consumer.getId(), sale.getId());

        int cartStock = cart.isEmpty() ? 0 : cart.get().getQuantity();

        return sale.getStock() - sale.getTotalQuantity() - cartStock;
    }
}
