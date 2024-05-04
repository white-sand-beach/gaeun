package com.todayeat.backend.category.mapper;

import com.todayeat.backend.category.entity.Category;
import com.todayeat.backend.category.entity.StoreCategory;
import com.todayeat.backend.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StoreCategoryMapper {

    StoreCategoryMapper INSTANCE = Mappers.getMapper(StoreCategoryMapper.class);

    @Mapping(target = "store", source = "store")
    @Mapping(target = "category", source = "category")
    StoreCategory toStoreCategory(Store store, Category category);
}