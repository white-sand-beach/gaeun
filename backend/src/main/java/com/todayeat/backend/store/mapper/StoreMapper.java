package com.todayeat.backend.store.mapper;

import com.todayeat.backend.seller.entity.Location;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.CreateStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerDetailStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerInfoStoreResponse;
import com.todayeat.backend.store.dto.response.GetSellerStoreResponse;
import com.todayeat.backend.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StoreMapper {

    StoreMapper INSTANCE = Mappers.getMapper(StoreMapper.class);

    @Mapping(target = "location", source = "location")
    Store createStoreRequestToStore(CreateStoreRequest createStoreRequest, Location location, String imageURL);

    CreateStoreResponse storeIdToCreateStoreResponse(Long storeId);

    @Mapping(target = "latitude", source = "location.lat")
    @Mapping(target = "longitude", source = "location.lon")
    GetSellerStoreResponse storeToGetSellerStoreResponse(Store store);

    @Mapping(target = "latitude", source = "store.location.lat")
    @Mapping(target = "longitude", source = "store.location.lon")
    GetConsumerInfoStoreResponse storeToGetConsumerStoreResponse(Store store, boolean favorite);

    GetConsumerDetailStoreResponse storeToGetConsumerDetailStoreResponse(Store store);

    @Mapping(target = "location", source = "location")
    void updateStoreRequestToStore(UpdateStoreRequest updateStoreRequest, String imageURL, Location location, @MappingTarget Store store);
}
