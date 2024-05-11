package com.todayeat.backend._common.refreshtoken.service;

import com.todayeat.backend._common.refreshtoken.entity.RefreshToken;
import com.todayeat.backend._common.refreshtoken.repository.RefreshTokenRepository;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.CookieUtil;
import com.todayeat.backend._common.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Date;

import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;

    @Value("${secret.refresh-token-expired-time}")
    private int REFRESH_TOKEN_EXPIRED_TIME;

    private static String REFRESH_TOKEN_COOKIE_NAME = "RefreshToken";

    @Transactional
    public void create(String refreshToken, Date expiration, Long memberId, String role) {

        save(refreshToken, expiration, memberId, role);
    }

//    @Transactional
//    public void deleteIfPresent(Long memberId, String role) {
//
//        refreshTokenRepository.findByMemberIdAndRole(memberId, role)
//                .ifPresent(refreshTokenRepository::delete);
//    }

    @Transactional
    public void reissue(HttpServletRequest request, HttpServletResponse response) {

        String accessTokenValue = getAccessToken(request);
        RefreshToken refreshToken = getRefreshToken(request);

        // 요청된 액세스 토큰의 만료일 != 저장된 액세스 토큰의 만료일
        if (!refreshToken.getExpiration().equals(jwtUtil.getExpirationFromExpiredToken(accessTokenValue))) {
            throw new BusinessException(TOKEN_INVALID);
        }

        // 토큰 삭제
        refreshTokenRepository.delete(refreshToken);

        // 쿠키 삭제
        cookieUtil.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);

        // 토큰 재발급
        Authentication authentication = jwtUtil.getAuthenticationFromExpiredToken(accessTokenValue);
        Long memberId = jwtUtil.getMemberIdFromExpiredToken(accessTokenValue);

        String createdAccessToken = jwtUtil.createAccessToken(authentication, memberId);
        String createdRefreshToken = jwtUtil.createRefreshToken();

        // 토큰 저장
        save(createdRefreshToken,
                jwtUtil.getExpiration(createdAccessToken),
                memberId,
                jwtUtil.getRole(createdAccessToken));

        // 토큰 넘기기
        response.addHeader(HttpHeaders.AUTHORIZATION, createdAccessToken);
        cookieUtil.addHttpOnlyCookie(response, REFRESH_TOKEN_COOKIE_NAME, createdRefreshToken, REFRESH_TOKEN_EXPIRED_TIME);
    }

    private String getAccessToken(HttpServletRequest request) {

        String accessToken = jwtUtil.getAccessToken(request);

        // 액세스 토큰이 없는 경우
        if (!StringUtils.hasText(accessToken)) {
            throw new BusinessException(TOKEN_NOT_FOUND);
        }

        // 액세스 토큰이 만료되지 않은 경우
        if (!jwtUtil.isExpiredToken(accessToken)) {
            throw new BusinessException(TOKEN_INVALID);
        }

        // 만료일 반환
        return accessToken;
    }

    private void save(String refreshToken, Date expiration, Long memberId, String role) {

        RefreshToken saveRefreshToken = RefreshToken.of(refreshToken, expiration, memberId, role);
        refreshTokenRepository.save(saveRefreshToken);
    }

    private RefreshToken getRefreshToken(HttpServletRequest request) {

        // 쿠키에서 리프레시 토큰 찾기
        String refreshTokenValue = cookieUtil.getCookie(request, REFRESH_TOKEN_COOKIE_NAME)
                .orElseThrow(() -> new BusinessException(TOKEN_NOT_FOUND))
                .getValue();

        // 객체 찾아서 반환
        return refreshTokenRepository.findByRefreshToken(refreshTokenValue)
                .orElseThrow(() -> new BusinessException(TOKEN_INVALID));
    }
}
