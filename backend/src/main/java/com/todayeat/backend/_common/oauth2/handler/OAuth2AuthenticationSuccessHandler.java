package com.todayeat.backend._common.oauth2.handler;

import com.todayeat.backend._common.oauth2.repository.OAuth2AuthorizationRepository;
import com.todayeat.backend._common.oauth2.service.OAuth2UnlinkService;
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
    private final OAuth2UnlinkService oAuth2UnlinkService;

    @Value("${oauth2.callback-uri}")
    private String OAUTH2_CALLBACK_URI;

    @Value("${secret.refresh-token-expired-time}")
    private int REFRESH_TOKEN_EXPIRED_TIME;

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

        // 회원 찾기
        Consumer consumer = consumerService.getConsumerOrNull(
                oAuth2UserPrincipal.getOAuth2UserResponse().getSocialType(),
                oAuth2UserPrincipal.getOAuth2UserResponse().getEmail());

        // 로그인
        if (mode.equals("login")) {

            // DB에 회원 존재
            if (consumer != null) {

                // 회원 정보 O -> 로그인 페이지로 리다이렉트
                if (consumer.isJoined()) {
                    sendRedirectToLoginUrl(request, response,
                            authentication, consumer.getId(),
                            redirectUri, "login");
                    return;
                }

                // 회원 정보 X -> 회원 가입 페이지로 리다이렉트
                sendRedirectToLoginUrl(request, response,
                        authentication, consumer.getId(),
                        redirectUri, "sign-up");
                return;
            }

            // 회원 가입
            sendRedirectToLoginUrl(request, response,
                    authentication, consumerService.create(oAuth2UserPrincipal),
                    redirectUri, "sign-up");
            return;
        }

        // 회원 탈퇴
        if (mode.equals("unlink") && consumer != null) {

            // DB 삭제, 리프레시 토큰 삭제
            consumerService.delete(consumer);

            try {
                // 소셜 끊기
                oAuth2UnlinkService.unlink(oAuth2UserPrincipal.getOAuth2UserResponse());
            } catch (Exception e) {
                // 실패
                consumerService.updateDeletedAt(consumer, null);
                sendRedirectToFailUrl(request, response, redirectUri);
            }

            // 리다이렉트
            sendRedirectToUnlinkUrl(request, response, redirectUri);

            return;
        }

        // TODO: 로그아웃 로직 구현
        sendRedirectToFailUrl(request, response, redirectUri);
    }

    private String getRedirectUriFromRequest(HttpServletRequest request) {

        return cookieUtil.getCookie(request, OAuth2AuthorizationRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(OAUTH2_CALLBACK_URI);
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
                .queryParam("error", "oauth2-fail")
                .build().toUriString();

        clearAuthenticationAttributes(request, response); // 쿠키 삭제
        response.sendRedirect(targetUrl);
    }

    private void sendRedirectToLoginUrl(HttpServletRequest request, HttpServletResponse response,
                                          Authentication authentication, Long memberId,
                                          String redirectUri, String nextPage) throws IOException {

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

        clearAuthenticationAttributes(request, response); // 쿠키 삭제
        cookieUtil.addCookie(response, "RefreshToken", refreshToken, REFRESH_TOKEN_EXPIRED_TIME); // 리프레시 토큰 담기

        response.sendRedirect(targetUrl);
    }

    private void sendRedirectToUnlinkUrl(HttpServletRequest request, HttpServletResponse response, String redirectUri) throws IOException {

        String targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
                .build().toUriString();

        clearAuthenticationAttributes(request, response); // 쿠키 삭제
        response.sendRedirect(targetUrl);
    }

    private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {

        super.clearAuthenticationAttributes(request);
        oAuth2AuthorizationRepository.removeAuthorizationRequestCookies(request, response);
    }
}