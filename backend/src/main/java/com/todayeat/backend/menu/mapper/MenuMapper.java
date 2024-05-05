package com.todayeat.backend.menu.mapper;

import com.todayeat.backend.menu.dto.CreateMenuRequest;
import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MenuMapper {

    MenuMapper INSTANCE = Mappers.getMapper(MenuMapper.class);

    @Mapping(source = "createMenuRequest.name", target = "name")
    Menu createMenuRequestToMenu(CreateMenuRequest createMenuRequest, Store store);
}
