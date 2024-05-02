package com.todayeat.backend.favorite.mapper;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.favorite.entity.Favorite;
import com.todayeat.backend.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FavoriteMapper {

    FavoriteMapper INSTANCE = Mappers.getMapper(FavoriteMapper.class);

    Favorite toFavorite(Consumer consumer, Store store);
}