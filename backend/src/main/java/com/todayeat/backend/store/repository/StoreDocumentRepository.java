package com.todayeat.backend.store.repository;

import com.todayeat.backend.store.entity.StoreDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface StoreDocumentRepository extends ElasticsearchRepository<StoreDocument, Long> {
}
