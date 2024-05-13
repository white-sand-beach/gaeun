package com.todayeat.backend._common.filter;

import com.todayeat.backend._common.refreshtoken.service.RefreshTokenService;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.CookieUtil;
import com.todayeat.backend._common.util.JwtUtil;
import com.todayeat.backend.seller.dto.SellerCustomUserDetails;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.repository.SellerRepository;
import com.todayeat.backend.store.entity.Store;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
public class SellerLoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;

    private final RefreshTokenService refreshTokenService;

    private final SellerRepository sellerRepository;

    @Value("${secret.refresh-token-expired-time}")
    private int REFRESH_TOKEN_EXPIRED_TIME;

    public SellerLoginFilter(AuthenticationManager authenticationManager, CookieUtil cookieUtil, JwtUtil jwtUtil, RefreshTokenService refreshTokenService, SellerRepository sellerRepository) {

        this.authenticationManager = authenticationManager;
        this.cookieUtil = cookieUtil;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
        this.sellerRepository = sellerRepository;
        setFilterProcessesUrl("/api/auth/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        log.info("[SellerLoginFilter.attemptAuthentication]");

        String email = request.getParameter("email");
        String password = obtainPassword(request);

        log.info("email: {}", email);
        log.info("password: {}", password);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password, null);

        log.info("authToken: {}", authToken);

        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        log.info("[SellerLoginFilter.successfulAuthentication]");

        SellerCustomUserDetails sellerCustomUserDetails = (SellerCustomUserDetails) authentication.getPrincipal();

        String accessToken = jwtUtil.createAccessToken(authentication, sellerCustomUserDetails.getId());
        String refreshToken = jwtUtil.createRefreshToken();

        refreshTokenService.create(refreshToken, jwtUtil.getExpiration(accessToken), sellerCustomUserDetails.getId(), "SELLER");

        response.setHeader(HttpHeaders.AUTHORIZATION, accessToken); // 액세스 토큰 담기

        cookieUtil.addHttpOnlyCookie(response, "RefreshToken", refreshToken, REFRESH_TOKEN_EXPIRED_TIME); // 리프레시 토큰 담기

        String storeId = String.valueOf(sellerRepository.findById(sellerCustomUserDetails.getId())
                .map(Seller::getStore)
                .map(Store::getId)
                .orElse(null));

        log.info("storeId {}", storeId);

        cookieUtil.addNonHttpOnlyCookie(response, "storeId", storeId, REFRESH_TOKEN_EXPIRED_TIME);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        log.info("[SellerLoginFilter.unsuccessfulAuthentication]");

        if (failed instanceof UsernameNotFoundException) {

            throw new BusinessException(EMAIL_NOT_FOUND);
        }

        if (failed instanceof BadCredentialsException) {

            throw new BusinessException(PASSWORD_UNAUTHORIZED);
        }

        throw new BusinessException(SELLER_UNAUTHORIZED);
    }
}

