package com.todayeat.backend.consumer.mapper;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.oauth2.dto.response.OAuth2Response;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ConsumerMapper {

    ConsumerMapper INSTANCE = Mappers.getMapper(ConsumerMapper.class);

    Consumer oAuth2PrincipalToConsumer(OAuth2Response oAuth2Response);
}
