package com.todayeat.backend.category.mapper;

import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend.category.dto.request.CreateCategoryRequest;
import com.todayeat.backend.category.dto.response.GetCategoryListResponse;
import com.todayeat.backend.category.entity.Category;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.web.multipart.MultipartFile;

import static com.todayeat.backend._common.entity.DirectoryType.SELLER_STORE_IMAGE;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    @Mapping(target = "image", source = "image", qualifiedByName = "imageToURL")
    Category createCategoryRequestToCategory(CreateCategoryRequest createCategoryRequest, @Context Long id, @Context S3Util s3Util);

    GetCategoryListResponse.CategoryInfo categoryToCategoryInfo(Category category);

    @Named("imageToURL")
    default String imageToURL(MultipartFile image, @Context Long id, @Context S3Util s3Util) {

        return s3Util.uploadImage(image, SELLER_STORE_IMAGE, id);
    }
}
