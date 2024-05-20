package com.todayeat.backend.searchKeyword.mapper;

import com.todayeat.backend.searchKeyword.entity.SearchKeywordDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SearchKeywordMapper {

    SearchKeywordMapper INSTANCE = Mappers.getMapper(SearchKeywordMapper.class);

    SearchKeywordDocument toSearchKeywordDocument(String keyword, Long timestamp);
}
