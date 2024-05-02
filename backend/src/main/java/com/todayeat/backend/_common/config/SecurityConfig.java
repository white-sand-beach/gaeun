package com.todayeat.backend._common.config;

import com.todayeat.backend._common.filter.JwtAuthenticationFilter;
import com.todayeat.backend._common.filter.JwtExceptionFilter;
import com.todayeat.backend._common.filter.SellerLoginFilter;
import com.todayeat.backend._common.oauth2.handler.OAuth2AuthenticationFailureHandler;
import com.todayeat.backend._common.oauth2.handler.OAuth2AuthenticationSuccessHandler;
import com.todayeat.backend._common.oauth2.repository.OAuth2AuthorizationRepository;
import com.todayeat.backend._common.oauth2.service.OAuth2Service;
import com.todayeat.backend._common.refreshtoken.service.RefreshTokenService;
import com.todayeat.backend._common.util.CookieUtil;
import com.todayeat.backend._common.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${WHITE_LIST}")
    private String[] whiteList;

    @Value("${SELLER_LIST}")
    private String[] sellerList;

    @Value("${CONSUMER_LIST}")
    private String[] consumerList;

    @Value("${BASE_URL}")
    private String baseURL;

    @Value("${LOCAL_SELLER_URL}")
    private String sellerURL;

    @Value("${LOCAL_CONSUMER_URL}")
    private String consumerURL;

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final OAuth2Service oAuth2Service;
    private final OAuth2AuthorizationRepository oAuth2AuthorizationRepository;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtExceptionFilter jwtExceptionFilter;
    private final JwtUtil jwtUtil;

    private final AuthenticationConfiguration authenticationConfiguration;

    private final CookieUtil cookieUtil;

    private final RefreshTokenService refreshTokenService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // click jacking 방지
                .headers(header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                // csrf 설정 비활성화 -> jwt 방식을 사용하기 때문
                .csrf(auth -> auth.disable())
                // cors 설정
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Form 로그인 방식 비활성화
                .formLogin(auth -> auth.disable())
                // HTTP Basic 인증 방식 비활성화
                .httpBasic(auth -> auth.disable())
                // oauth2 설정
                .oauth2Login(configure ->
                        configure.authorizationEndpoint(config -> config.authorizationRequestRepository(oAuth2AuthorizationRepository))
                                .userInfoEndpoint(config -> config.userService(oAuth2Service))
                                .successHandler(oAuth2AuthenticationSuccessHandler)
                                .failureHandler(oAuth2AuthenticationFailureHandler)
                )
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers(whiteList).permitAll()
                        .requestMatchers(sellerList).hasRole("SELLER")
                        .requestMatchers(consumerList).hasRole("CONSUMER")
                        .anyRequest().authenticated())
                .addFilterAt(new SellerLoginFilter(authenticationManager(authenticationConfiguration), cookieUtil, jwtUtil, refreshTokenService), UsernamePasswordAuthenticationFilter.class)
                // RESTful API
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // filter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtAuthenticationFilter.class);

        return http.build();
    }

    CorsConfigurationSource corsConfigurationSource() {

        return request -> {
            CorsConfiguration config = new CorsConfiguration();

            // FRONT 주소 허용
            config.setAllowedOrigins(Arrays.asList(baseURL, sellerURL, consumerURL));
            // 모든 REST Method 허용
            config.setAllowedMethods(Collections.singletonList("*"));
            // credential 값 허용
            config.setAllowCredentials(true);
            // 모든 header 허용
            config.setAllowedHeaders(Collections.singletonList("*"));
            // preflight 요청의 결과를 캐시할 시간 지정
            config.setMaxAge(3600L);
            // "Authorization" 헤더 허용
            config.addExposedHeader(HttpHeaders.AUTHORIZATION);

            return config;
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }


    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {

        return web -> web.ignoring() // 시큐리티 적용 X
                .requestMatchers("/error", "/favicon.ico");
    }
}
