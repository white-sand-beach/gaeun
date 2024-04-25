package com.todayeat.backend.refreshtoken.service;

import com.todayeat.backend.refreshtoken.entity.RefreshToken;
import com.todayeat.backend.refreshtoken.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void create(String refreshToken, String accessToken, Long memberId, String role) {

        log.info("[RefreshTokenService.create]");

        RefreshToken saveRefreshToken = RefreshToken.of(refreshToken, accessToken, memberId, role);
        refreshTokenRepository.save(saveRefreshToken);
    }

    @Transactional
    public void deleteIfPresent(Long memberId, String role) {

        log.info("[RefreshTokenService.delete]");

        refreshTokenRepository.findByMemberIdAndRole(memberId, role)
                .ifPresent(refreshToken -> refreshTokenRepository.delete(refreshToken));
    }
}
