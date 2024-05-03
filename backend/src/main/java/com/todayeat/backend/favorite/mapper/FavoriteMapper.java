package com.todayeat.backend.favorite.mapper;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.favorite.dto.response.FavoriteInfo;
import com.todayeat.backend.favorite.dto.response.GetFavoriteListResponse;
import com.todayeat.backend.favorite.entity.Favorite;
import com.todayeat.backend.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FavoriteMapper {

    FavoriteMapper INSTANCE = Mappers.getMapper(FavoriteMapper.class);

    Favorite toFavorite(Consumer consumer, Store store);

    @Mapping(source = "id", target = "favoriteId")
    @Mapping(source = "store.id", target = "storeId")
    @Mapping(source = "store.name", target = "storeName")
    @Mapping(source = "store.image", target = "storeImageUrl")
    @Mapping(source = "store.favoriteCnt", target = "storeFavoriteCnt")
    @Mapping(source = "store.reviewCnt", target = "storeReviewCnt")
    FavoriteInfo toFavoriteInfo(Favorite favorite);

    GetFavoriteListResponse toGetFavoriteListResponse(List<FavoriteInfo> favoriteInfos, Long totalCnt, Integer page, Boolean hasNext);
}