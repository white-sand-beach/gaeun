package com.todayeat.backend.sale.mapper;

import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.sale.dto.SaleInfo;
import com.todayeat.backend.sale.dto.request.CreateSaleRequest;
import com.todayeat.backend.sale.dto.response.GetSaleSellerResponse;
import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SaleMapper {

    SaleMapper INSTANCE = Mappers.getMapper(SaleMapper.class);

    @Mapping(source = "createSaleRequest.sellPrice", target = "sellPrice")
    @Mapping(source = "menu.name", target = "name")
    @Mapping(source = "menu", target = "menu")
    Sale createSaleRequestToSale(CreateSaleRequest createSaleRequest, Integer discountRate, Boolean isFinished, Integer totalQuantity, Store store, Menu menu);

    @Mapping(source = "sale.id", target = "saleId")
    @Mapping(source = "sale.menu.id", target = "menuId")
    GetSaleSellerResponse getSaleSellerResponse(Sale sale, Integer restStock);

    SaleInfo saleToSaleInfo(Sale sale);
}
