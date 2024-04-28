package com.todayeat.backend._common.oauth2.handler;

import com.todayeat.backend._common.oauth2.repository.OAuth2AuthorizationRepository;
import com.todayeat.backend._common.util.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler implements AuthenticationFailureHandler {

    private final OAuth2AuthorizationRepository oAuth2AuthorizationRepository;
    private final CookieUtil cookieUtil;

    @Value("${oauth2.login-callback-uri}")
    private String loginCallbackUri;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {

        log.error("oauth2 인증 실패 : {}", exception.getMessage());

        // redirect uri
        String targetUrl = UriComponentsBuilder
                .fromUriString(getRedirectUriFromRequest(request))
                .queryParam("error", exception.getLocalizedMessage())
                .build().toUriString();

        // 쿠키 삭제
        oAuth2AuthorizationRepository.removeAuthorizationRequestCookies(request, response);

        // 리다이렉트
        response.sendRedirect(targetUrl);
    }

    private String getRedirectUriFromRequest(HttpServletRequest request) {

        return cookieUtil.getCookie(request, OAuth2AuthorizationRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(loginCallbackUri);
    }
}