package com.todayeat.backend.searchKeyword.service;

import com.todayeat.backend.searchKeyword.dto.response.GetPopularSearchListResponse;
import com.todayeat.backend.searchKeyword.dto.response.GetPopularSearchListResponse.KeywordInfo;
import com.todayeat.backend.searchKeyword.entity.SearchKeywordDocument;
import com.todayeat.backend.searchKeyword.mapper.SearchKeywordMapper;
import com.todayeat.backend.searchKeyword.repository.SearchKeywordDocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SearchKeywordService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final SearchKeywordDocumentRepository searchKeywordDocumentRepository;

    @Transactional
    public void saveSearchKeyword(String keyword) {

        searchKeywordDocumentRepository.save(
                SearchKeywordMapper.INSTANCE.toSearchKeywordDocument(keyword, LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli())
        );
    }

    public GetPopularSearchListResponse getTopKeywordsInLastHour() {

        long now = System.currentTimeMillis();
        long oneHourAgo = now - 3600000;

        Criteria criteria = Criteria.where("timestamp").between(oneHourAgo, now);
        CriteriaQuery query = new CriteriaQuery(criteria);

        SearchHits<SearchKeywordDocument> searchHits = elasticsearchOperations.search(query, SearchKeywordDocument.class);

        Map<String, Long> keywordCounts = searchHits.stream()
                .map(hit -> hit.getContent().getKeyword())
                .collect(Collectors.groupingBy(keyword -> keyword, Collectors.counting()));

        List<KeywordInfo> topKeywords = keywordCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(10)
                .map(entry -> KeywordInfo.of(entry.getKey()))
                .collect(Collectors.toList());

        return GetPopularSearchListResponse.of(topKeywords);
    }
}
