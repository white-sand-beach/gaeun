package com.todayeat.backend.store.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.store.dto.request.CreateStoreRequest;
import com.todayeat.backend.store.mapper.StoreMapper;
import com.todayeat.backend.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.todayeat.backend._common.response.error.ErrorType.STORE_CONFLICT;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    private final SecurityUtil securityUtil;

    @Transactional
    public void create(CreateStoreRequest createStoreRequest) {

        if (storeRepository.existsByRegisteredNo(createStoreRequest.getRegisteredNo())) {

            throw new BusinessException(STORE_CONFLICT);
        }

        Seller seller = securityUtil.getSeller();
        storeRepository.save(StoreMapper.INSTANCE.createStoreRequestToStore(createStoreRequest, seller));
    }
}
