package com.todayeat.backend._common.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todayeat.backend._common.response.error.ErrorType;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static com.todayeat.backend._common.response.error.ErrorType.TOKEN_INVALID;

@Slf4j
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Value("${WHITE_LIST}")
    private String[] whiteList;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return Arrays.stream(whiteList).anyMatch(request.getRequestURI()::startsWith);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            filterChain.doFilter(request, response); // 다음 필터로 넘기기
        } catch (JwtException e) {
            log.error("JwtExceptionFilter doFilterInternal : ", e);
            setErrorResponse(response, TOKEN_INVALID);
        }
    }

    public void setErrorResponse(HttpServletResponse response, ErrorType errorType) throws IOException {

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        Map<String, Object> errors = new HashMap<>();
        errors.put("code", errorType.getHttpStatus().value());
        errors.put("status", errorType.getHttpStatus().name());
        errors.put("message", errorType.getMsg());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getOutputStream(), errors);
        response.setStatus(errorType.getHttpStatus().value());
    }
}
