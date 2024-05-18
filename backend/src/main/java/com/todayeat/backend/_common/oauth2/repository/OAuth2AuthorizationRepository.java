package com.todayeat.backend._common.oauth2.repository;

import com.todayeat.backend._common.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class OAuth2AuthorizationRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

    public static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    public static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
    public static final String MODE_PARAM_COOKIE_NAME = "mode";
    public static final int COOKIE_EXPIRE_SECONDS = 100;

    private final CookieUtil cookieUtil;

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {

        // 쿠키 정보 꺼내기
        return cookieUtil.getCookie(request, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME)
                .map(cookie -> cookieUtil.deserialize(cookie, OAuth2AuthorizationRequest.class))
                .orElse(null);
    }

    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request, HttpServletResponse response) {

        if (authorizationRequest == null) {
            removeAuthorizationRequestCookies(request, response);
        }

        // 쿠키 저장
        cookieUtil.addHttpOnlyCookie(response,
                OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME,
                cookieUtil.serialize(authorizationRequest),
                COOKIE_EXPIRE_SECONDS);

        // redirect uri
        String redirectUri = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
        if (StringUtils.hasText(redirectUri)) {
            cookieUtil.addHttpOnlyCookie(response,
                    REDIRECT_URI_PARAM_COOKIE_NAME,
                    redirectUri,
                    COOKIE_EXPIRE_SECONDS);
        }

        // mode (login, logout, unlink)
        String mode = request.getParameter(MODE_PARAM_COOKIE_NAME);
        if (StringUtils.hasText(mode)) {
            cookieUtil.addHttpOnlyCookie(response,
                    MODE_PARAM_COOKIE_NAME,
                    mode,
                    COOKIE_EXPIRE_SECONDS);
        }
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request, HttpServletResponse response) {

        return this.loadAuthorizationRequest(request);
    }

    public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {

        cookieUtil.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
        cookieUtil.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);
        cookieUtil.deleteCookie(request, response, MODE_PARAM_COOKIE_NAME);
    }
}