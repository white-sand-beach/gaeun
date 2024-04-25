package com.todayeat.backend.oauth2.handler;

import com.todayeat.backend._common.util.CookieUtil;
import com.todayeat.backend._common.util.JwtUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.consumer.service.ConsumerService;
import com.todayeat.backend.oauth2.dto.auth.OAuth2UserPrincipal;
import com.todayeat.backend.oauth2.repository.OAuth2AuthorizationRepository;
import com.todayeat.backend.refreshtoken.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

import static com.todayeat.backend.oauth2.repository.OAuth2AuthorizationRepository.MODE_PARAM_COOKIE_NAME;
import static com.todayeat.backend.oauth2.repository.OAuth2AuthorizationRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final OAuth2AuthorizationRepository oAuth2AuthorizationRepository;
    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;
    private final ConsumerService consumerService;
    private final RefreshTokenService refreshTokenService;

    @Value("${oauth2.login-callback-uri}")
    private String loginCallbackUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        log.info("oauth2 인증 성공");

        // 이미 http 응답이 클라이언트로 보내진 경우
        if (response.isCommitted()) {
            log.debug("response is already committed!");
            return;
        }

        String targetUrl = getTargetUrl(request, authentication);
        clearAuthenticationAttributes(request, response); // 쿠키 삭제
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private String getTargetUrl(HttpServletRequest request, Authentication authentication) {

        log.info("[OAuth2AuthenticationSuccessHandler.getTargetUrl]");

        // redirect uri
        String redirectUri = getRedirectUriFromRequest(request);

        // login, logout, unlink
        String mode = getModeFromRequest(request);

        log.info("redirectUri: {}", redirectUri);
        log.info("mode: {}", mode);

        // 유저 인증 정보
        OAuth2UserPrincipal oAuth2UserPrincipal = getOAuth2UserAuthentication(authentication);
        if (oAuth2UserPrincipal == null) {
            return getFailUrl(redirectUri);
        }

        // 로그인
        if (mode.equals("login")) {
            // 회원 찾기
            Consumer consumer = consumerService.getConsumerOrNull(
                    oAuth2UserPrincipal.getUserInfo().getSocialType(),
                    oAuth2UserPrincipal.getUserInfo().getEmail());

            // 로그인
            if (consumer != null) {
                return getLoginUrl(authentication, redirectUri, consumer.getId(), "login");
            }

            // 회원가입
            return getLoginUrl(authentication, redirectUri, consumerService.create(oAuth2UserPrincipal), "sign-up");
        }

        // TODO: 회원탈퇴, 로그아웃 로직 구현
        return getFailUrl(redirectUri);
    }

    private String getRedirectUriFromRequest(HttpServletRequest request) {

        return cookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(loginCallbackUri);
    }

    private String getModeFromRequest(HttpServletRequest request) {

        return cookieUtil.getCookie(request, MODE_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(null);
    }

    private OAuth2UserPrincipal getOAuth2UserAuthentication(Authentication authentication) {

        Object principal = authentication.getPrincipal();

        if (principal instanceof OAuth2UserPrincipal) {
            return (OAuth2UserPrincipal) principal;
        }

        return null;
    }

    private String getFailUrl(String redirectUri) {

        return UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("error", "login-fail")
                .build().toUriString();
    }

    private String getLoginUrl(Authentication authentication, String redirectUri, Long memberId, String nextPage) {

        // 기존에 토큰이 존재하면 삭제
        refreshTokenService.deleteIfPresent(memberId, "CONSUMER");

        // 토큰 생성
        String accessToken = jwtUtil.createAccessToken(authentication, memberId);
        String refreshToken = jwtUtil.createRefreshToken();

        // 토큰 저장
        refreshTokenService.create(refreshToken, accessToken, memberId, "CONSUMER");

        // 리다이렉트
        return UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("access-token", accessToken)
                .queryParam("refresh-token", refreshToken)
                .queryParam("next-page", nextPage)
                .build().toUriString();
    }

    private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {

        super.clearAuthenticationAttributes(request);
        oAuth2AuthorizationRepository.removeAuthorizationRequestCookies(request, response);
    }
}