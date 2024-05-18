package com.todayeat.backend._common.util;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.consumer.repository.ConsumerRepository;
import com.todayeat.backend.seller.repository.SellerRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.*;

import static com.todayeat.backend._common.response.error.ErrorType.TOKEN_INVALID;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final ConsumerRepository consumerRepository;
    private final SellerRepository sellerRepository;
//    private final long ACCESS_TOKEN_VALID_TIME = (60 * 1000) * 30; // 30분
    private final long ACCESS_TOKEN_VALID_TIME = (60 * 1000) * 60 * 24 * 3; // 3일
    private final String AUTHORITIES_KEY = "role";
    private final String TOKEN_PREFIX = "Bearer ";

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
        List<GrantedAuthority> authList = getGrantedAuthorities(authorities);

        if (authorities.equals("ROLE_CONSUMER")) {

            return consumerRepository.findByIdAndDeletedAtIsNull(getMemberId(token))
                    .map(consumer -> new UsernamePasswordAuthenticationToken(consumer, null, authList))
                    .orElseThrow(() -> new JwtException(null));
        }
        if (authorities.equals("ROLE_SELLER")) {

            return sellerRepository.findByIdAndDeletedAtIsNull(getMemberId(token))
                    .map(seller -> new UsernamePasswordAuthenticationToken(seller, null, authList))
                    .orElseThrow(() -> new JwtException(null));
        }

        throw new JwtException(null);
    }

    public boolean isExpiredToken(String token) {
        try {
            return getClaims(token).getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }

    public Authentication getAuthenticationFromExpiredToken(String token) {

        log.info("[JwtUtil.getAuthenticationFromExpiredToken]");

        // 권한
        String authorities = getRoleFromExpiredToken(token);
        List<GrantedAuthority> authList = getGrantedAuthorities(getRoleFromExpiredToken(token));

        if (authorities.equals("ROLE_CONSUMER")) {

            return consumerRepository.findByIdAndDeletedAtIsNull(getMemberIdFromExpiredToken(token))
                    .map(consumer -> new UsernamePasswordAuthenticationToken(consumer, null, authList))
                    .orElseThrow(() -> new JwtException(null));
        }
        if (authorities.equals("ROLE_SELLER")) {

            return sellerRepository.findByIdAndDeletedAtIsNull(getMemberIdFromExpiredToken(token))
                    .map(seller -> new UsernamePasswordAuthenticationToken(seller, null, authList))
                    .orElseThrow(() -> new JwtException(null));
        }

        throw new BusinessException(TOKEN_INVALID);
    }

    public Date getExpirationFromExpiredToken(String token) {

        log.info("[JwtUtil.getExpirationFromExpiredToken]");

        try {
            Claims claims = getClaims(token);
            return claims.getExpiration();
        } catch (ExpiredJwtException e) {
            Claims expiredClaims = e.getClaims();
            return expiredClaims.getExpiration();
        }
    }

    public String getAccessToken(HttpServletRequest request) {

        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(token) && token.startsWith(TOKEN_PREFIX)) {
            return token.substring(TOKEN_PREFIX.length());
        }

        return null;
    }

    private Claims getClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Long getMemberId(String token) {

        log.info("[JwtUtil.getMemberId]");

        Claims claims = getClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    public String getRole(String token) {

        log.info("[JwtUtil.getRole]");

        return getClaims(token).get(AUTHORITIES_KEY, String.class);
    }

    private List<GrantedAuthority> getGrantedAuthorities(String authorities) {

        List<GrantedAuthority> authList = new ArrayList<>();
        authList.add(new SimpleGrantedAuthority(authorities));
        return authList;
    }

    public Long getMemberIdFromExpiredToken(String token) {

        log.info("[JwtUtil.getMemberIdFromExpiredToken]");

        try {
            Claims claims = getClaims(token);
            return Long.parseLong(claims.getSubject());
        } catch (ExpiredJwtException e) {
            Claims expiredClaims = e.getClaims();
            return Long.parseLong(expiredClaims.getSubject());
        }
    }

    private String getRoleFromExpiredToken(String token) {

        log.info("[JwtUtil.getRoleFromExpiredToken]");

        try {
            Claims claims = getClaims(token);
            return claims.get(AUTHORITIES_KEY, String.class);
        } catch (ExpiredJwtException e) {
            Claims expiredClaims = e.getClaims();
            return expiredClaims.get(AUTHORITIES_KEY, String.class);
        }
    }
}