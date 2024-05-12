package com.todayeat.backend.sale.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.sale.dto.request.CreateSaleListRequest;
import com.todayeat.backend.sale.dto.request.UpdateSaleContentRequest;
import com.todayeat.backend.sale.dto.request.UpdateSaleStatusRequest;
import com.todayeat.backend.sale.dto.request.UpdateSaleStockRequest;
import com.todayeat.backend.sale.dto.response.GetSaleDetailConsumerResponse;
import com.todayeat.backend.sale.dto.response.GetSaleListConsumerResponse;
import com.todayeat.backend.sale.dto.response.GetSaleListSellerResponse;
import com.todayeat.backend.sale.service.SaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SaleController implements SaleControllerDocs {

    private final SaleService saleService;

    @Override
    public SuccessResponse<Void> create(CreateSaleListRequest request) {

        saleService.create(request);

        return SuccessResponse.of(SuccessType.CREATE_SALE_SUCCESS);
    }

    @Override
    public SuccessResponse<GetSaleListConsumerResponse> getListToConsumer(Long storeId) {

        return SuccessResponse.of(saleService.getListToConsumer(storeId), SuccessType.GET_SALE_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<GetSaleDetailConsumerResponse> getDetailToConsumer(Long saleId) {

        return SuccessResponse.of(saleService.getDetailToConsumer(saleId), SuccessType.GET_SALE_DETAIL_SUCCESS);
    }

    @Override
    public SuccessResponse<GetSaleListSellerResponse> getListToSeller(Long storeId) {

        return SuccessResponse.of(saleService.getListToSeller(storeId), SuccessType.GET_SALE_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updateStatus(Long saleId, UpdateSaleStatusRequest request) {

        saleService.updateStatus(saleId, request);

        return SuccessResponse.of(SuccessType.UPDATE_SALE_STATUS_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updateContent(Long saleId, UpdateSaleContentRequest request) {

        saleService.updateContent(saleId, request);

        return SuccessResponse.of(SuccessType.UPDATE_SALE_CONTENT_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updateStock(Long saleId, UpdateSaleStockRequest request) {

        saleService.updateStock(saleId, request);

        return SuccessResponse.of(SuccessType.UPDATE_SALE_CONTENT_SUCCESS);
    }
}

