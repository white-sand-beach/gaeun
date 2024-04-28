package com.todayeat.backend.location.mapper;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.location.dto.request.CreateLocationRequest;
import com.todayeat.backend.location.entity.Coordinate;
import com.todayeat.backend.location.entity.Location;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    LocationMapper INSTANCE = Mappers.getMapper(LocationMapper.class);

    Coordinate createLocationRequestToCoordinate(CreateLocationRequest request);
    Location createLocationRequestToLocation(Consumer consumer, Coordinate coordinate, CreateLocationRequest request);
}
