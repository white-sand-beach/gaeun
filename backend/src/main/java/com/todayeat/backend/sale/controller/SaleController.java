package com.todayeat.backend.sale.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import com.todayeat.backend.sale.dto.request.CreateSaleListRequest;
import com.todayeat.backend.sale.dto.request.UpdateSaleStatusRequest;
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
    public SuccessResponse<Void> updateStatus(Long saleId, UpdateSaleStatusRequest request) {

        saleService.updateStatus(saleId, request);

        return SuccessResponse.of(SuccessType.UPDATE_SALE_STATUS_SUCCESS);
    }
}
