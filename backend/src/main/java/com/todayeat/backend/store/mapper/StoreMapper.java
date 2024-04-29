package com.todayeat.backend.store.mapper;

import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StoreMapper {

    StoreMapper INSTANCE = Mappers.getMapper(StoreMapper.class);

    @Mapping(source = "createStoreRequest.address", target = "coordinate.address")
    @Mapping(source = "createStoreRequest.latitude", target = "coordinate.latitude")
    @Mapping(source = "createStoreRequest.longitude", target = "coordinate.longitude")
    Store createStoreRequestToStore(CreateStoreRequest createStoreRequest, Seller seller);
}
