package com.todayeat.backend.store.config;

import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.category.repository.CategoryRepository;
import com.todayeat.backend.category.repository.StoreCategoryRepository;
import com.todayeat.backend.favorite.repository.FavoriteRepository;
import com.todayeat.backend.sale.repository.SaleRepository;
import com.todayeat.backend.searchKeyword.service.SearchKeywordService;
import com.todayeat.backend.seller.repository.SellerRepository;
import com.todayeat.backend.store.repository.StoreDocumentRepository;
import com.todayeat.backend.store.repository.StoreRepository;
import com.todayeat.backend.store.service.StoreService;
import com.todayeat.backend.store.service.StoreServiceElasticsearchImpl;
import com.todayeat.backend.store.service.StoreServiceQueryDSLImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;

@Configuration
@RequiredArgsConstructor
public class StoreServiceConfig {

    private final ElasticsearchOperations elasticsearchOperations;
    private final StoreDocumentRepository storeDocumentRepository;
    private final StoreCategoryRepository storeCategoryRepository;
    private final FavoriteRepository favoriteRepository;
    private final CategoryRepository categoryRepository;
    private final SellerRepository sellerRepository;
    private final StoreRepository storeRepository;
    private final SaleRepository saleRepository;
    private final SearchKeywordService searchKeywordService;
    private final SecurityUtil securityUtil;
    private final S3Util s3Util;

    @Bean
    public StoreService storeService() {

        //return new StoreServiceQueryDSLImpl(storeCategoryRepository, favoriteRepository, categoryRepository,
        //        sellerRepository, storeRepository, securityUtil, s3Util);

        return new StoreServiceElasticsearchImpl(elasticsearchOperations, storeDocumentRepository, storeCategoryRepository, favoriteRepository, categoryRepository,
                sellerRepository, storeRepository, saleRepository, searchKeywordService, securityUtil, s3Util);
    }
}
