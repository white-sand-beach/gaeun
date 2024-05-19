package com.todayeat.backend.store.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.category.dto.CategoryInfo;
import com.todayeat.backend.category.entity.Category;
import com.todayeat.backend.category.entity.StoreCategory;
import com.todayeat.backend.category.mapper.CategoryMapper;
import com.todayeat.backend.category.mapper.StoreCategoryMapper;
import com.todayeat.backend.category.repository.CategoryRepository;
import com.todayeat.backend.category.repository.StoreCategoryRepository;
import com.todayeat.backend.favorite.repository.FavoriteRepository;
import com.todayeat.backend.order.repository.OrderInfoRepository;
import com.todayeat.backend.sale.dto.SaleInfo;
import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.sale.mapper.SaleMapper;
import com.todayeat.backend.sale.repository.SaleRepository;
import com.todayeat.backend.searchKeyword.service.SearchKeywordService;
import com.todayeat.backend.seller.entity.Location;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.repository.SellerRepository;
import com.todayeat.backend.store.dto.GetStoreSaleCountInfo;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.dto.request.UpdateStoreRequest;
import com.todayeat.backend.store.dto.response.*;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse.StoreInfo;
import com.todayeat.backend.store.dto.response.GetConsumerListStoreResponse.StoreInfo.SaleImageURL;
import com.todayeat.backend.store.entity.Store;
import com.todayeat.backend.store.entity.StoreDocument;
import com.todayeat.backend.store.mapper.StoreMapper;
import com.todayeat.backend.store.repository.StoreDocumentRepository;
import com.todayeat.backend.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.document.Document;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.GeoDistanceOrder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.data.elasticsearch.core.query.UpdateQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.todayeat.backend._common.entity.DirectoryType.SELLER_STORE_IMAGE;
import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreServiceElasticsearchImpl implements StoreService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final StoreDocumentRepository storeDocumentRepository;
    private final StoreCategoryRepository storeCategoryRepository;
    private final OrderInfoRepository orderInfoRepository;
    private final FavoriteRepository favoriteRepository;
    private final CategoryRepository categoryRepository;
    private final SellerRepository sellerRepository;
    private final StoreRepository storeRepository;
    private final SaleRepository saleRepository;

    private final SearchKeywordService searchKeywordService;

    private final SecurityUtil securityUtil;
    private final S3Util s3Util;

    @Override
    @Transactional
    public CreateStoreResponse create(CreateStoreRequest createStoreRequest) {

        Seller seller = sellerRepository.findById(securityUtil.getSeller().getId())
                .orElseThrow(() -> new BusinessException(SELLER_NOT_FOUND));

        if (seller.getStore() != null) {

            throw new BusinessException(STORE_CONFLICT);
        }

        String imageURL = imageToURL(createStoreRequest.getImage());

        try {

            Store store = storeRepository.save(
                    StoreMapper.INSTANCE.createStoreRequestToStore(
                            createStoreRequest,
                            Location.of(createStoreRequest.getLatitude(), createStoreRequest.getLongitude()),
                            imageURL));

            seller.updateStore(store);

            List<Category> categoryList = createStoreRequest.getCategoryIdList().stream()
                    .map(categoryId -> categoryRepository.findById(categoryId)
                            .orElseThrow(() -> new BusinessException(CATEGORY_NOT_FOUND))).toList();

            categoryList.stream()
                    .map(category -> StoreCategoryMapper.INSTANCE.toStoreCategory(store, category))
                    .forEach(storeCategoryRepository::save);

            List<CategoryInfo> categoryInfoList = categoryList.stream()
                    .map(CategoryMapper.INSTANCE::categoryToCategoryInfo)
                    .toList();

            storeDocumentRepository.save(StoreMapper.INSTANCE.storeToStoreDocument(store, categoryInfoList));

            return StoreMapper.INSTANCE.storeIdToCreateStoreResponse(store.getId());
        } catch (RuntimeException e) {

            s3Util.deleteImageIfPresent(imageURL);
            throw new RuntimeException(e);
        }
    }

    @Override
    public GetSellerStoreResponse getSellerStore(Long storeId) {

        Store store = securityUtil.getSeller().getStore();

        if (store == null || !Objects.equals(store.getId(), storeId)) {

            throw new BusinessException(STORE_NOT_FOUND);
        }

        return StoreMapper.INSTANCE.storeDocumentToGetSellerStoreResponse(
                validateAndGetStoreDocument(storeId));
    }

    @Override
    public GetConsumerInfoStoreResponse getConsumerInfoStore(Long storeId) {

        return StoreMapper.INSTANCE.storeDocumentToGetConsumerInfoStoreResponse(
                validateAndGetStoreDocument(storeId),
                favoriteRepository.existsByConsumerAndStoreIdAndDeletedAtIsNull(
                        securityUtil.getConsumer(),
                        storeId));
    }

    @Override
    public GetConsumerDetailStoreResponse getConsumerDetailStore(Long storeId) {

        return StoreMapper.INSTANCE.storeDocumentToGetConsumerDetailStoreResponse(
                validateAndGetStoreDocument(storeId));
    }

    @Override
    public GetConsumerListStoreResponse getConsumerListStore(BigDecimal latitude, BigDecimal longitude, Integer radius, String keyword, Long categoryId, Integer page, Integer size, String sort) {

        Sort by;

        if ("distance".equals(sort)) {

            by = Sort.by(new GeoDistanceOrder("location", new GeoPoint(latitude.doubleValue(), longitude.doubleValue())));
        } else {

            by = Sort.by(Sort.Order.desc(sort));
        }

        PageRequest pageRequest = PageRequest.of(page, size, by);

        Query query = NativeQuery.builder()
                .withQuery(q -> q.bool(b -> {
                    if (keyword != null && !keyword.isEmpty()) {
                        searchKeywordService.saveSearchKeyword(keyword);

                        b.must(m -> m.multiMatch(mm -> mm
                                .query(keyword)
                                .fields("name", "categoryList.name", "saleList.name")));
                    }
                    b.must(m -> m.geoDistance(g -> g
                            .field("location")
                            .distance(radius + "km")
                            .location(l -> l.latlon(ll -> ll.lat(latitude.doubleValue()).lon(longitude.doubleValue())))));
                    if (categoryId != null) {
                        searchKeywordService.saveSearchKeyword(
                                categoryRepository.findById(categoryId)
                                        .orElseThrow(() -> new BusinessException(CATEGORY_NOT_FOUND))
                                        .getName()
                        );

                        b.must(m -> m.term(t -> t
                                .field("categoryList.categoryId")
                                .value(categoryId)));
                    }
                    b.must(m -> m.term(t -> t
                            .field("isOpened")
                            .value(true)));
                    b.mustNot(mn -> mn.exists(e -> e.field("deletedAt")));
                    return b;
                }))
                .withPageable(pageRequest)
                .build();

        SearchHits<StoreDocument> searchHits = elasticsearchOperations.search(query, StoreDocument.class, IndexCoordinates.of("store"));

        List<StoreInfo> storeInfoList = searchHits.getSearchHits().stream()
                .map(hit -> {
                    StoreDocument document = hit.getContent();

                    int distance = calculateDistance(
                            latitude.doubleValue(), longitude.doubleValue(),
                            document.getLocation().getLat().doubleValue(), document.getLocation().getLon().doubleValue());

                    List<SaleImageURL> saleImageURLList = saleRepository.findAllByStoreIdAndIsFinishedIsFalseAndDeletedAtIsNull(document.getId()).stream()
                            .map(StoreMapper.INSTANCE::saleToSaleImageURL)
                            .toList();

                    return StoreMapper.INSTANCE.storeDocumentToStoreInfo(document, distance, saleImageURLList);
                })
                .collect(Collectors.toList());

        Boolean hasNext = pageRequest.getPageNumber() + 1 < (searchHits.getTotalHits() / pageRequest.getPageSize()) + 1;

        return GetConsumerListStoreResponse.of(storeInfoList, securityUtil.getConsumer().getIsDonated(), page, hasNext);
    }

    @Override
    @Transactional
    public void update(Long storeId, UpdateStoreRequest updateStoreRequest) {

        Store store = sellerRepository.findById(securityUtil.getSeller().getId())
                .map(Seller::getStore)
                .filter(s -> Objects.equals(s.getId(), storeId))
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));

        String imageURL = imageToURL(updateStoreRequest.getImage());

        try {

            StoreMapper.INSTANCE.updateStoreRequestToStore(
                    updateStoreRequest,
                    imageURL,
                    Location.of(updateStoreRequest.getLatitude(), updateStoreRequest.getLongitude()),
                    store);

            List<StoreCategory> existingCategories = storeCategoryRepository.findByStoreIdAndDeletedAtIsNull(storeId);
            Set<Long> existingCategoryIds = existingCategories.stream()
                    .map(sc -> sc.getCategory().getId())
                    .collect(Collectors.toSet());

            existingCategories.stream()
                    .filter(sc -> !updateStoreRequest.getCategoryIdList().contains(sc.getCategory().getId()))
                    .forEach(storeCategoryRepository::delete);

            updateStoreRequest.getCategoryIdList().stream()
                    .filter(id -> !existingCategoryIds.contains(id))
                    .forEach(id -> storeCategoryRepository.save(
                            StoreCategoryMapper.INSTANCE.toStoreCategory(store, categoryRepository.findById(id).get())));

            // 엘라스틱 서치 저장
            List<CategoryInfo> categoryInfoList = updateStoreRequest.getCategoryIdList().stream()
                    .map(categoryId -> categoryRepository.findById(categoryId)
                            .orElseThrow(() -> new BusinessException(CATEGORY_NOT_FOUND))).toList().stream()
                    .map(CategoryMapper.INSTANCE::categoryToCategoryInfo).toList();

            storeDocumentRepository.save(
                    StoreMapper.INSTANCE.updateStoreRequestToStoreDocument(
                            storeId,
                            updateStoreRequest,
                            imageURL,
                            store.getReviewCnt(),
                            store.getFavoriteCnt(),
                            categoryInfoList)
            );
        } catch (RuntimeException e) {

            s3Util.deleteImageIfPresent(imageURL);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public void updateIsOpened(Store store, Boolean isOpened) {

        store.updateIsOpened(isOpened);

        Document document = Document.create();
        document.put("isOpened", isOpened);

        UpdateQuery updateQuery = UpdateQuery.builder(store.getId().toString())
                .withDocument(document)
                .build();

        elasticsearchOperations.update(updateQuery, IndexCoordinates.of("store"));
    }

    @Override
    @Transactional
    public void updateAllIsExample() {

        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul")).truncatedTo(ChronoUnit.HOURS);

        YearMonth lastMonth = YearMonth.from(now.minusMonths(1));
        LocalDateTime startDate = lastMonth.atDay(1).atStartOfDay();
        LocalDateTime endDate = lastMonth.atEndOfMonth().atTime(23, 59, 59);

        List<GetStoreSaleCountInfo> result = orderInfoRepository.countFinishedOrdersByStore(startDate, endDate);

        result.forEach(getStoreSaleCountInfo -> {
            Store store = storeRepository.findByIdAndDeletedAtIsNull(getStoreSaleCountInfo.getStoreId())
                    .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));
            Boolean isExample = getStoreSaleCountInfo.getOrderFinishedCnt() >= 10;

            store.updateIsExample(isExample);

            Document document = Document.create();
            document.put("isExample", isExample);

            UpdateQuery updateQuery = UpdateQuery.builder(store.getId().toString())
                    .withDocument(document)
                    .build();

            elasticsearchOperations.update(updateQuery, IndexCoordinates.of("store"));
        });
    }

    @Override
    @Transactional
    public void updateSaleCnt(Store store, int value) {

        store.updateSaleCnt(value);

        Document document = Document.create();
        document.put("saleCnt", store.getSaleCnt());

        UpdateQuery updateQuery = UpdateQuery.builder(store.getId().toString())
                .withDocument(document)
                .build();

        elasticsearchOperations.update(updateQuery, IndexCoordinates.of("store"));
    }

    @Override
    @Transactional
    public void updateReviewCnt(Store store, int value) {

        store.updateReviewCnt(value);

        Document document = Document.create();
        document.put("reviewCnt", store.getReviewCnt());

        UpdateQuery updateQuery = UpdateQuery.builder(store.getId().toString())
                .withDocument(document)
                .build();

        elasticsearchOperations.update(updateQuery, IndexCoordinates.of("store"));
    }

    @Override
    @Transactional
    public void updateFavoriteCnt(Store store, int value) {

        store.updateFavoriteCnt(value);

        Document document = Document.create();

        document.put("favoriteCnt", store.getFavoriteCnt());

        UpdateQuery updateQuery = UpdateQuery.builder(store.getId().toString())
                .withDocument(document)
                .build();

        elasticsearchOperations.update(updateQuery, IndexCoordinates.of("store"));
    }

    @Override
    @Transactional
    public void addSaleList(Store store, List<Sale> saleList) {

        StoreDocument storeDocument = validateAndGetStoreDocument(store.getId());

        List<SaleInfo> saleInfoList = storeDocument.getSaleList();

        List<String> existingNameList = saleInfoList.stream()
                .map(SaleInfo::getName)
                .toList();

        saleList.forEach(sale -> {
            if (!existingNameList.contains(sale.getName())) {

                saleInfoList.add(SaleMapper.INSTANCE.saleToSaleInfo(sale));
            }
        });

        Document document = Document.create();

        document.put("saleList", saleInfoList);

        UpdateQuery updateQuery = UpdateQuery.builder(store.getId().toString())
                .withDocument(document)
                .build();

        elasticsearchOperations.update(updateQuery, IndexCoordinates.of("store"));
    }

    @Override
    @Transactional
    public void deleteSale(Store store, String name) {

        IndexCoordinates indexCoordinates = IndexCoordinates.of("store");

        StoreDocument storeDocument = elasticsearchOperations.get(store.getId().toString(), StoreDocument.class, indexCoordinates);

        if (storeDocument == null) {

            throw new BusinessException(STORE_NOT_FOUND);
        }

        List<SaleInfo> saleInfoList = storeDocument.getSaleList();
        if (saleInfoList != null) {

            List<SaleInfo> updatedSaleInfoList = null;
            if (name != null) {

                updatedSaleInfoList = saleInfoList.stream()
                        .filter(saleInfo -> !saleInfo.getName().equals(name))
                        .collect(Collectors.toList());
            }

            storeDocument.setSaleList(updatedSaleInfoList);

            Document document = Document.create();
            document.put("saleList", updatedSaleInfoList);

            UpdateQuery updateQuery = UpdateQuery.builder(store.getId().toString())
                    .withDocument(document)
                    .build();

            elasticsearchOperations.update(updateQuery, indexCoordinates);
        }
    }

    private String imageToURL(MultipartFile image) {

        return s3Util.uploadImageIfPresent(image, SELLER_STORE_IMAGE, securityUtil.getSeller().getId());
    }

    private StoreDocument validateAndGetStoreDocument(Long storeId) {
        return storeDocumentRepository.findById(storeId)
                .orElseThrow(() -> new BusinessException(STORE_NOT_FOUND));
    }

    private int calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (int) (R * c * 1000);
    }
}
