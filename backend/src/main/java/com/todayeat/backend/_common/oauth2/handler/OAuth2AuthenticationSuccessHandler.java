package com.todayeat.backend._common.oauth2.handler;

import com.todayeat.backend._common.oauth2.repository.OAuth2AuthorizationRepository;
import com.todayeat.backend._common.util.CookieUtil;
import com.todayeat.backend._common.util.JwtUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.consumer.service.ConsumerService;
import com.todayeat.backend._common.oauth2.dto.auth.OAuth2UserPrincipal;
import com.todayeat.backend._common.refreshtoken.service.RefreshTokenService;
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

        sendRedirectToTargetUrl(request, response, authentication);
    }

    private void sendRedirectToTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

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
            sendRedirectToFailUrl(request, response, redirectUri);
            return;
        }

        // 로그인
        if (mode.equals("login")) {
            // 회원 찾기
            Consumer consumer = consumerService.getConsumerOrNull(
                    oAuth2UserPrincipal.getUserInfo().getSocialType(),
                    oAuth2UserPrincipal.getUserInfo().getEmail());

            // 로그인
            if (consumer != null) {
                sendRedirectToLoginUrl(request, response,
                                    authentication, consumer.getId(),
                                    redirectUri, "login");
                return;
            }

            // 회원가입
            sendRedirectToLoginUrl(request, response,
                    authentication, consumerService.create(oAuth2UserPrincipal),
                    redirectUri, "login");
            return;
        }

        // TODO: 회원탈퇴, 로그아웃 로직 구현
        sendRedirectToFailUrl(request, response, redirectUri);
    }

    private String getRedirectUriFromRequest(HttpServletRequest request) {

        return cookieUtil.getCookie(request, OAuth2AuthorizationRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(loginCallbackUri);
    }

    private String getModeFromRequest(HttpServletRequest request) {

        return cookieUtil.getCookie(request, OAuth2AuthorizationRepository.MODE_PARAM_COOKIE_NAME)
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

    private void sendRedirectToFailUrl(HttpServletRequest request, HttpServletResponse response, String redirectUri) throws IOException {

        String targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("error", "login-fail")
                .build().toUriString();

        clearAuthenticationAttributes(request, response); // 쿠키 삭제
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private void sendRedirectToLoginUrl(HttpServletRequest request, HttpServletResponse response,
                                          Authentication authentication, Long memberId,
                                          String redirectUri, String nextPage) throws IOException {

        // 기존에 토큰이 존재하면 삭제
//        refreshTokenService.deleteIfPresent(memberId, "CONSUMER");

        // 토큰 생성
        String accessToken = jwtUtil.createAccessToken(authentication, memberId);
        String refreshToken = jwtUtil.createRefreshToken();

        // 토큰 저장
        refreshTokenService.create(refreshToken, jwtUtil.getExpiration(accessToken), memberId, "CONSUMER");

        // 리다이렉트
        String targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
                    .queryParam("next-page", nextPage)
                    .queryParam("access-token", accessToken)
                    .build().toUriString(); // 주소
//        response.setHeader(HttpHeaders.AUTHORIZATION, accessToken); // 액세스 토큰 담기

        clearAuthenticationAttributes(request, response); // 쿠키 삭제
        cookieUtil.addCookie(response, "RefreshToken", refreshToken, 100); // 리프레시 토큰 담기

        response.sendRedirect(targetUrl);
    }

    private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {

        super.clearAuthenticationAttributes(request);
        oAuth2AuthorizationRepository.removeAuthorizationRequestCookies(request, response);
    }
}