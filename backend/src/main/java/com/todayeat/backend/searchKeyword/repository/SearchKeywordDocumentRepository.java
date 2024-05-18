package com.todayeat.backend.searchKeyword.repository;

import com.todayeat.backend.searchKeyword.entity.SearchKeywordDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface SearchKeywordDocumentRepository extends ElasticsearchRepository<SearchKeywordDocument, Long> {
}
