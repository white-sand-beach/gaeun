package com.todayeat.backend._common.config;

import com.todayeat.backend._common.filter.SellerLoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${WHITE_LIST}")
    private String[] whiteList;

    @Value("${SELLER_LIST}")
    private String[] sellerList;

    @Value("${SELLER_URL}")
    private String sellerURL;

    private final AuthenticationConfiguration authenticationConfiguration;

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

                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers(whiteList).permitAll()
                        .requestMatchers(sellerList).hasRole("SELLER")
                        .anyRequest().authenticated())
                .addFilterAt(new SellerLoginFilter(authenticationManager(authenticationConfiguration)), UsernamePasswordAuthenticationFilter.class)
                // RESTful API
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));


        return http.build();
    }

    CorsConfigurationSource corsConfigurationSource() {

        return request -> {
            CorsConfiguration config = new CorsConfiguration();

            // FRONT 주소 허용
            config.setAllowedOrigins(Collections.singletonList(sellerURL));
            // 모든 REST Method 허용
            config.setAllowedMethods(Collections.singletonList("*"));
            // credential 값 허용
            config.setAllowCredentials(true);
            // 모든 header 허용
            config.setAllowedHeaders(Collections.singletonList("*"));
            // preflight 요청의 결과를 캐시할 시간 지정
            config.setMaxAge(3600L);

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
}
