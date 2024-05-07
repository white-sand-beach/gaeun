package com.todayeat.backend.store.mapper;

import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.GetConsumerDetailStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerInfoStoreResponse;
import com.todayeat.backend.store.dto.response.GetSellerStoreResponse;
import com.todayeat.backend.store.entity.Store;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StoreMapper {

    StoreMapper INSTANCE = Mappers.getMapper(StoreMapper.class);

    @Mapping(target = "location", source = "location")
    Store createStoreRequestToStore(CreateStoreRequest createStoreRequest, Point location, String imageURL);

    @Mapping(target = "longitude", source = "location.y")
    @Mapping(target = "latitude", source = "location.x")
    GetSellerStoreResponse storeToGetSellerStoreResponse(Store store);

    @Mapping(target = "longitude", source = "location.y")
    @Mapping(target = "latitude", source = "location.x")
    GetConsumerInfoStoreResponse storeToGetConsumerStoreResponse(Store store);

    GetConsumerDetailStoreResponse storeToGetConsumerDetailStoreResponse(Store store);

    @Mapping(target = "location", source = "location")
    void updateStoreRequestToStore(UpdateStoreRequest updateStoreRequest, String imageURL, Point location, @MappingTarget Store store);
}
