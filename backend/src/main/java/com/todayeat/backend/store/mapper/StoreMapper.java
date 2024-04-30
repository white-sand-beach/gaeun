package com.todayeat.backend.store.mapper;

import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.response.GetConsumerInfoStoreResponse;
import com.todayeat.backend.store.dto.response.GetConsumerDetailStoreResponse;
import com.todayeat.backend.store.dto.response.GetSellerStoreResponse;
import com.todayeat.backend.store.entity.Store;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.web.multipart.MultipartFile;

import static com.todayeat.backend._common.entity.DirectoryType.SELLER_STORE_IMAGE;

@Mapper(componentModel = "spring")
public interface StoreMapper {

    StoreMapper INSTANCE = Mappers.getMapper(StoreMapper.class);

    @Mapping(target = "coordinate.address", source = "createStoreRequest.address")
    @Mapping(target = "coordinate.latitude", source = "createStoreRequest.latitude")
    @Mapping(target = "coordinate.longitude", source = "createStoreRequest.longitude")
    @Mapping(target = "image", source = "createStoreRequest.image", qualifiedByName = "imageToURL")
    Store createStoreRequestToStore(CreateStoreRequest createStoreRequest, @Context Long id, @Context S3Util s3Util);

    @Mapping(target = ".", source = "coordinate")
    GetSellerStoreResponse storeToGetSellerStoreResponse(Store store);

    @Mapping(target = ".", source = "coordinate")
    GetConsumerInfoStoreResponse storeToGetConsumerStoreResponse(Store store);

    @Mapping(target = ".", source = "coordinate")
    GetConsumerDetailStoreResponse storeToGetConsumerDetailStoreResponse(Store store);

    @Named("imageToURL")
    default String imageToURL(MultipartFile image, @Context Long id, @Context S3Util s3Util) {

        return s3Util.uploadImage(image, SELLER_STORE_IMAGE, id);
    }
}
