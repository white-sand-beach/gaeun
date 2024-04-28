package com.todayeat.backend._common.filter;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.seller.dto.SellerCustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Collection;
import java.util.Iterator;

import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
public class SellerLoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public SellerLoginFilter(AuthenticationManager authenticationManager) {

        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl("/auth/login");
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

        String email = sellerCustomUserDetails.getEmail();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        log.info("auth: {}", auth);

        String role = auth.getAuthority();

        log.info("email: {}", email);
        log.info("role: {}", role);

        // todo jwt 발급
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
