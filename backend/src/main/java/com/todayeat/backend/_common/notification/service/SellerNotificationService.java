package com.todayeat.backend._common.notification.service;

import com.todayeat.backend._common.notification.dto.CreateSellerOrderNotification;
import com.todayeat.backend._common.notification.entity.SellerNotification;
import com.todayeat.backend._common.notification.repository.SellerNotificationRepository;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SellerNotificationService {

    private final SellerNotificationRepository sellerNotificationRepository;
    private final SellerRepository sellerRepository;

    @Transactional
    public void createSellerOrderNotification(CreateSellerOrderNotification createDTO) {

        Seller seller = sellerRepository.findById(createDTO.getSellerId())
                .orElseThrow(() -> new BusinessException(ErrorType.SELLER_NOT_FOUND));

        sellerNotificationRepository.save(SellerNotification.of(createDTO.getType(),
                createDTO.getTypeId(), createDTO.getContent(), seller));
    }
}
