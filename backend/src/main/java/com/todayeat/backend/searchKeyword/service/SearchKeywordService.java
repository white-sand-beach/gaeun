package com.todayeat.backend.searchKeyword.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.RedisUtil;
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
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SearchKeywordService {

    private final SearchKeywordDocumentRepository searchKeywordDocumentRepository;
    private final ElasticsearchOperations elasticsearchOperations;
    private final ObjectMapper objectMapper;
    private final RedisUtil redisUtil;

    private static final String POPULAR_KEYWORDS_KEY = "popularKeywords";

    @Transactional
    public void saveSearchKeyword(String keyword) {

        searchKeywordDocumentRepository.save(
                SearchKeywordMapper.INSTANCE.toSearchKeywordDocument(keyword, LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli())
        );
    }

    public GetPopularSearchListResponse getTopKeywordsInLastHour() {

        String popularKeywordsJson = redisUtil.getValueByKey(POPULAR_KEYWORDS_KEY);

        if (popularKeywordsJson == null) {

            updatePopularSearchListInRedis();
            popularKeywordsJson = redisUtil.getValueByKey(POPULAR_KEYWORDS_KEY);
        }

        try {

            return objectMapper.readValue(popularKeywordsJson, GetPopularSearchListResponse.class);
        } catch (JsonProcessingException e) {

            throw new BusinessException(ErrorType.INTERNAL_SERVER_ERROR);
        }
    }

    public void updatePopularSearchListInRedis() {

        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul")).truncatedTo(ChronoUnit.HOURS);
        LocalDateTime oneHourAgo = now.minusHours(1);

        long nowMillis = now.atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli();
        long oneHourAgoMillis = oneHourAgo.atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli();

        Criteria criteria = Criteria.where("timestamp").between(oneHourAgoMillis, nowMillis);
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

        GetPopularSearchListResponse popularKeywords = GetPopularSearchListResponse.of(topKeywords);

        try {

            String popularKeywordsJson = objectMapper.writeValueAsString(popularKeywords);
            redisUtil.setKeyValue(POPULAR_KEYWORDS_KEY, popularKeywordsJson, 3600000);
        } catch (JsonProcessingException e) {

            throw new BusinessException(ErrorType.INTERNAL_SERVER_ERROR);
        }
    }
}
