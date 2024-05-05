package com.todayeat.backend.location.mapper;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.location.dto.request.CreateLocationRequest;
import com.todayeat.backend.location.dto.request.UpdateLocationRequest;
import com.todayeat.backend.location.dto.response.GetLocationResponse;
import com.todayeat.backend.location.entity.Coordinate;
import com.todayeat.backend.location.entity.Location;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    LocationMapper INSTANCE = Mappers.getMapper(LocationMapper.class);

    @Mapping(source = "request.address", target = "coordinate.address")
    @Mapping(source = "request.latitude", target = "coordinate.latitude")
    @Mapping(source = "request.longitude", target = "coordinate.longitude")
    Location createLocationRequestToLocation(Consumer consumer, CreateLocationRequest request);

    @Mapping(source = "location.coordinate.address", target = "address")
    @Mapping(source = "location.coordinate.latitude", target = "latitude")
    @Mapping(source = "location.coordinate.longitude", target = "longitude")
    @Mapping(source = "location.id", target = "locationId")
    GetLocationResponse locationToGetLocationResponse(Location location);
}
