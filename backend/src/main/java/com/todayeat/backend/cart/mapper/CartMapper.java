package com.todayeat.backend.cart.mapper;

import com.todayeat.backend.cart.dto.request.CreateCartRequest;
import com.todayeat.backend.cart.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CartMapper {

    CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    Cart createCartRequestToCart(CreateCartRequest request, Long consumerId);
}
