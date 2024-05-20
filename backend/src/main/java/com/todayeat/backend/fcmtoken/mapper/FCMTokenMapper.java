package com.todayeat.backend.fcmtoken.mapper;

import com.todayeat.backend.fcmtoken.dto.request.CreateFCMTokenRequest;
import com.todayeat.backend.fcmtoken.entity.FCMToken;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FCMTokenMapper {

    FCMTokenMapper INSTANCE = Mappers.getMapper(FCMTokenMapper.class);

    @Mapping(source = "request.token", target = "id")
    FCMToken createFCMToken(CreateFCMTokenRequest request, Long memberId, String role);
}
