package com.todayeat.backend._common.notification.service;

import com.todayeat.backend._common.notification.dto.CreateOrderNotification;
import com.todayeat.backend._common.notification.entity.SellerNotification;
import com.todayeat.backend._common.notification.repository.SellerNotificationRepository;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.seller.entity.Seller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SellerNotificationService {

    private final SellerNotificationRepository sellerNotificationRepository;
    private final SecurityUtil securityUtil;

    @Transactional
    public void createSellerOrderNotification(CreateOrderNotification createDTO) {

        Seller seller = securityUtil.getSeller();

        sellerNotificationRepository.save(SellerNotification.of(createDTO.getType(),
                createDTO.getTypeId(), createDTO.getContent(), seller));
    }
}
