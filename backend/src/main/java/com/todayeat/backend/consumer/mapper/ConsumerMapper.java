package com.todayeat.backend.consumer.mapper;

import com.todayeat.backend.consumer.dto.response.GetConsumerProfileResponse;
import com.todayeat.backend.consumer.dto.response.GetConsumerResponse;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ConsumerMapper {

    ConsumerMapper INSTANCE = Mappers.getMapper(ConsumerMapper.class);

    Consumer oAuth2UserResponseToConsumer(OAuth2UserResponse oAuth2UserResponse);

    GetConsumerProfileResponse toGetConsumerProfileResponse(Consumer consumer);

    @Mapping(source = "profileImage", target = "imageUrl")
    GetConsumerResponse toGetConsumerResponse(Consumer consumer);
}
