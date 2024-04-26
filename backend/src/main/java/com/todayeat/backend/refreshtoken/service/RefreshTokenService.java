package com.todayeat.backend.refreshtoken.service;

import com.todayeat.backend.refreshtoken.entity.RefreshToken;
import com.todayeat.backend.refreshtoken.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void create(String refreshToken, Date expiration, Long memberId, String role) {

        log.info("[RefreshTokenService.create]");

        RefreshToken saveRefreshToken = RefreshToken.of(refreshToken, expiration, memberId, role);
        refreshTokenRepository.save(saveRefreshToken);
    }

    @Transactional
    public void deleteIfPresent(Long memberId, String role) {

        log.info("[RefreshTokenService.delete]");

        refreshTokenRepository.findByMemberIdAndRole(memberId, role)
                .ifPresent(refreshTokenRepository::delete);
    }
}
