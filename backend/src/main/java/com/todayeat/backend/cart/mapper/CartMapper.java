package com.todayeat.backend.cart.mapper;

import com.todayeat.backend.cart.dto.request.CreateCartRequest;
import com.todayeat.backend.cart.dto.response.GetCartResponse;
import com.todayeat.backend.cart.entity.Cart;
import com.todayeat.backend.sale.entity.Sale;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CartMapper {

    CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    Cart createCartRequestToCart(CreateCartRequest request, Long consumerId);

    @Mapping(source = "sale.id", target = "saleId")
    @Mapping(source = "sale.imageUrl", target = "imageUrl")
    @Mapping(source = "sale.name", target = "saleName")
    @Mapping(source = "sale.originalPrice", target = "originalPrice")
    @Mapping(source = "sale.sellPrice", target = "sellPrice")
    @Mapping(source = "sale.discountRate", target = "discountRate")
    @Mapping(source = "sale.content", target = "content")
    @Mapping(source = "sale.isFinished", target="isFinished")
    @Mapping(source = "cartId", target = "cartId")
    GetCartResponse getCartResponse(String cartId, Sale sale, Integer restStock, Integer quantity);
}
