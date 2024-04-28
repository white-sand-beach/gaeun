package com.todayeat.backend._common.util;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.consumer.repository.ConsumerRepository;
import com.todayeat.backend.seller.repository.SellerRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;

import static com.todayeat.backend._common.response.error.ErrorType.INVALID_TOKEN;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    // TODO: 토큰 재발급 로직 구현

    private final ConsumerRepository consumerRepository;
    private final SellerRepository sellerRepository;

    private final long ACCESS_TOKEN_VALID_TIME = (60 * 1000) * 30; // 30분
    private final String AUTHORITIES_KEY = "role";

    @Value("${secret.jwt-secret-key}")
    private String JWT_SECRET_KEY;
    private Key key;

    @PostConstruct
    protected void init() {

        String encodedKey = Base64.getEncoder().encodeToString(JWT_SECRET_KEY.getBytes());
        this.key = Keys.hmacShaKeyFor(encodedKey.getBytes()); // JWT_SECRET_KEY -> Key
    }

    public String createAccessToken(Authentication authentication, Long memberId) {

        log.info("[JwtUtil.createAccessToken]");

        // 권한
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst().orElseGet(null);

        // 현재 날짜
        Date now = new Date();
        // 만료 날짜
        Date expiration = new Date(now.getTime() + ACCESS_TOKEN_VALID_TIME);

        return Jwts.builder()
                .setSubject(memberId.toString())
                .claim(AUTHORITIES_KEY, authorities)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken() {

        log.info("[JwtUtil.createRefreshToken]");

        return UUID.randomUUID().toString();
    }

    public Date getExpiration(String token) {

        return getClaims(token).getExpiration();
    }

    public Authentication getAuthentication(String token) {
        log.info("[JwtUtil.getAuthentication]");

        // 권한
        String authorities = getRole(token);
        List<GrantedAuthority> authList = new ArrayList<>();
        authList.add(new SimpleGrantedAuthority(authorities));

        if (authorities.equals("ROLE_CONSUMER")) {

            return consumerRepository.findByIdAndDeletedAtIsNull(getMemberId(token))
                    .map(consumer -> new UsernamePasswordAuthenticationToken(consumer, null, authList))
                    .orElseThrow(() -> new BusinessException(INVALID_TOKEN));
        }
        if (authorities.equals("ROLE_SELLER")) {

            return sellerRepository.findByIdAndDeletedAtIsNull(getMemberId(token))
                    .map(seller -> new UsernamePasswordAuthenticationToken(seller, null, authList))
                    .orElseThrow(() -> new BusinessException(INVALID_TOKEN));
        }

        throw new BusinessException(INVALID_TOKEN);
    }

    public Long getMemberId(String token) {

        log.info("[JwtUtil.getMemberId]");

        Claims claims = getClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    public String getRole(String token) {

        log.info("[JwtUtil.getRole]");

        return getClaims(token).get(AUTHORITIES_KEY, String.class);
    }

//    public Long getMemberIdFromExpiredToken(String token) {
//
//        log.info("[JwtUtil.getMemberIdFromExpiredToken]");
//
//        try {
//            Claims claims = getClaims(token);
//            return Long.parseLong(claims.getSubject());
//        } catch (ExpiredJwtException e) {
//            Claims expiredClaims = e.getClaims();
//            return Long.parseLong(expiredClaims.getSubject());
//        }
//    }

//    public String getRoleFromExpiredToken(String token) {
//
//        log.info("[JwtUtil.getRoleFromExpiredToken]");
//
//        try {
//            Claims claims = getClaims(token);
//            return claims.get(AUTHORITIES_KEY, String.class);
//        } catch (ExpiredJwtException e) {
//            Claims expiredClaims = e.getClaims();
//            return expiredClaims.get(AUTHORITIES_KEY, String.class);
//        }
//    }

    private Claims getClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}