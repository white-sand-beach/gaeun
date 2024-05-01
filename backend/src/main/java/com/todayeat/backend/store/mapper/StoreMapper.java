package com.todayeat.backend.store.mapper;

import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.GetConsumerDetailStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerInfoStoreResponse;
import com.todayeat.backend.store.dto.response.GetSellerStoreResponse;
import com.todayeat.backend.store.entity.Store;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
public interface StoreMapper {

    StoreMapper INSTANCE = Mappers.getMapper(StoreMapper.class);

    @Mapping(target = "location", expression = "java(createPoint(createStoreRequest.getLatitude(), createStoreRequest.getLongitude()))")
    Store createStoreRequestToStore(CreateStoreRequest createStoreRequest, String imageURL);

    @Mapping(target = "longitude", source = "location.x")
    @Mapping(target = "latitude", source = "location.y")
    GetSellerStoreResponse storeToGetSellerStoreResponse(Store store);

    @Mapping(target = "longitude", source = "location.x")
    @Mapping(target = "latitude", source = "location.y")
    GetConsumerInfoStoreResponse storeToGetConsumerStoreResponse(Store store);

    GetConsumerDetailStoreResponse storeToGetConsumerDetailStoreResponse(Store store);

    @Mapping(target = "location", expression = "java(createPoint(updateStoreRequest.getLatitude(), updateStoreRequest.getLongitude()))")
    void updateStoreRequestToStore(UpdateStoreRequest updateStoreRequest, String imageURL, @MappingTarget Store store);

    default Point createPoint(BigDecimal latitude, BigDecimal longitude) {
        GeometryFactory geometryFactory = new GeometryFactory();
        Coordinate coordinate = new Coordinate(latitude.doubleValue(), longitude.doubleValue());
        return geometryFactory.createPoint(coordinate);
    }
}
