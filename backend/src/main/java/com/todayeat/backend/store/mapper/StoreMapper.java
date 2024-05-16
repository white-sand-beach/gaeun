package com.todayeat.backend.store.mapper;

import com.todayeat.backend.category.dto.CategoryInfo;
import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.seller.entity.Location;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.CreateStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerDetailStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerInfoStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse.StoreInfo;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse.StoreInfo.SaleImageURL;
import com.todayeat.backend.store.dto.response.GetSellerStoreResponse;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.entity.StoreDocument;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StoreMapper {

    StoreMapper INSTANCE = Mappers.getMapper(StoreMapper.class);

    @Mapping(target = "location", source = "location")
    Store createStoreRequestToStore(CreateStoreRequest createStoreRequest, Location location, String imageURL);

    CreateStoreResponse storeIdToCreateStoreResponse(Long storeId);

    @Mapping(target = "latitude", source = "store.location.lat")
    @Mapping(target = "longitude", source = "store.location.lon")
    GetSellerStoreResponse storeToGetSellerStoreResponse(Store store, List<CategoryInfo> categoryList);

    @Mapping(target = "latitude", source = "store.location.lat")
    @Mapping(target = "longitude", source = "store.location.lon")
    GetConsumerInfoStoreResponse storeToGetConsumerStoreResponse(Store store, boolean favorite);

    GetConsumerDetailStoreResponse storeToGetConsumerDetailStoreResponse(Store store);

    @Mapping(target = "location", source = "location")
    void updateStoreRequestToStore(UpdateStoreRequest updateStoreRequest, String imageURL, Location location, @MappingTarget Store store);

    StoreDocument storeToStoreDocument(Store store, List<CategoryInfo> categoryList);

    @Mapping(target = "latitude", source = "storeDocument.location.lat")
    @Mapping(target = "longitude", source = "storeDocument.location.lon")
    GetSellerStoreResponse storeDocumentToGetSellerStoreResponse(StoreDocument storeDocument);

    @Mapping(target = "latitude", source = "storeDocument.location.lat")
    @Mapping(target = "longitude", source = "storeDocument.location.lon")
    GetConsumerInfoStoreResponse storeDocumentToGetConsumerInfoStoreResponse(StoreDocument storeDocument, boolean isFavorite);

    GetConsumerDetailStoreResponse storeDocumentToGetConsumerDetailStoreResponse(StoreDocument storeDocument);

    @Mapping(target = "location.lat", source = "updateStoreRequest.latitude")
    @Mapping(target = "location.lon", source = "updateStoreRequest.longitude")
    StoreDocument updateStoreRequestToStoreDocument(Long id, UpdateStoreRequest updateStoreRequest, String imageURL, int reviewCnt, int favoriteCnt, List<CategoryInfo> categoryList);


    @Mapping(target = "storeId", source = "storeDocument.id")
    @Mapping(target = "latitude", source = "storeDocument.location.lat")
    @Mapping(target = "longitude", source = "storeDocument.location.lon")
    StoreInfo storeDocumentToStoreInfo(StoreDocument storeDocument, int distance, List<SaleImageURL> saleImageURLList);

    @Mapping(target = "imageURL", source = "imageUrl")
    SaleImageURL saleToSaleImageURL(Sale sale);
}
