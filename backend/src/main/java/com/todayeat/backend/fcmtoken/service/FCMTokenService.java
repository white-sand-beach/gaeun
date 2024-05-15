package com.todayeat.backend.fcmtoken.service;

import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.fcmtoken.dto.request.CreateFCMTokenRequest;
import com.todayeat.backend.fcmtoken.dto.request.DeleteFCMTokenRequest;
import com.todayeat.backend.fcmtoken.mapper.FCMTokenMapper;
import com.todayeat.backend.fcmtoken.repository.FCMTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FCMTokenService {

    private final FCMTokenRepository fcmTokenRepository;
    private final SecurityUtil securityUtil;

    @Transactional
    public void create(CreateFCMTokenRequest request) {

        String role = securityUtil.getPrincipalClassSimpleName();
        Long memberId = getMemberId(role);

        fcmTokenRepository.save(FCMTokenMapper
                .INSTANCE.createFCMToken(request, memberId, securityUtil.getPrincipalClassSimpleName()));
    }

    @Transactional
    public void delete(DeleteFCMTokenRequest request) {

        fcmTokenRepository.deleteById(request.getToken());
    }

    private Long getMemberId(String role) {

        if (role.equals("Seller")) {
            return securityUtil.getSeller().getId();
        }

        if (role.equals("Consumer")) {
            return securityUtil.getConsumer().getId();
        }

        throw new BusinessException(ErrorType.REQUEST_FORBIDDEN);
    }
}
