package com.todayeat.backend.consumer.service;

import com.todayeat.backend._common.entity.DirectoryType;
import com.todayeat.backend._common.refreshtoken.repository.RefreshTokenRepository;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.CookieUtil;
import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.dto.request.CheckNicknameRequest;
import com.todayeat.backend.consumer.dto.request.UpdateConsumerRequest;
import com.todayeat.backend.consumer.dto.response.CheckNicknameResponse;
import com.todayeat.backend.consumer.dto.response.GetConsumerProfileResponse;
import com.todayeat.backend.consumer.dto.response.GetConsumerResponse;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.consumer.mapper.ConsumerMapper;
import com.todayeat.backend.consumer.repository.ConsumerRepository;
import com.todayeat.backend._common.oauth2.dto.auth.OAuth2UserPrincipal;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2Provider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ConsumerService {

    private final ConsumerRepository consumerRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final SecurityUtil securityUtil;
    private final CookieUtil cookieUtil;
    private final S3Util s3Util;

    private static String REFRESH_TOKEN_COOKIE_NAME = "RefreshToken";
    private static String ACCESS_TOKEN_COOKIE_NAME = "accessToken";

    @Transactional
    public Long create(OAuth2UserPrincipal principal) {

        Consumer consumer = ConsumerMapper.INSTANCE.oAuth2UserResponseToConsumer(principal.getOAuth2UserResponse());
        consumerRepository.save(consumer);

        return consumer.getId();
    }

    @Transactional
    public void update(UpdateConsumerRequest request) {

        Consumer consumer = findBySecurityContext();

        // 닉네임 중복 검사
        if (existsByNickname(request.getNickname()) && !consumer.getNickname().equals(request.getNickname())) {
            throw new BusinessException(NICKNAME_CONFLICT);
        }

        String imageUrl = null;

        // 이미지 S3 업로드
        if (request.getProfileImage() != null) {
            imageUrl = s3Util.uploadImage(request.getProfileImage(), DirectoryType.CONSUMER_PROFILE_IMAGE, consumer.getId());
        }

        // 소비자 회원 정보 수정
        try {
            consumerRepository.updateConsumer(consumer.getId(), imageUrl, request.getNickname(), request.getPhoneNumber());
        } catch (Exception e) {
            if (imageUrl != null) {
                s3Util.deleteImage(imageUrl);
            }
            throw new BusinessException(CONSUMER_UPDATE_FAIL);
        }

        // 기존 이미지 삭제
        if (imageUrl == null && consumer.getProfileImage() != null) {
            s3Util.deleteImage(consumer.getProfileImage());
        }
    }

    public Consumer getConsumerOrNull(OAuth2Provider socialType, String email) {

        return findBySocialTypeAndEmail(socialType, email);
    }

    public CheckNicknameResponse checkNickname(CheckNicknameRequest request) {

        // 존재하면 -> isValid = false (닉네임 사용 불가)
        // 존재하지 않으면 -> isValid = true (닉네임 사용 가능)
        return CheckNicknameResponse.of(!existsByNickname(request.getNickname()));
    }

    public GetConsumerResponse get() {

        Consumer consumer = findBySecurityContext();
        return ConsumerMapper.INSTANCE.toGetConsumerResponse(consumer);
    }

    public GetConsumerProfileResponse getProfile() {

        Consumer consumer = findBySecurityContext();
        return ConsumerMapper.INSTANCE.toGetConsumerProfileResponse(consumer);
    }

    @Transactional
    public void delete(Consumer consumer) {

        // 리프레시 토큰 삭제
        refreshTokenRepository.findByMemberIdAndRole(consumer.getId(), "CONSUMER")
                        .forEach(r -> refreshTokenRepository.delete(r));

        // DB 삭제
        consumerRepository.delete(consumer);
    }

    @Transactional
    public void updateDeletedAt(Consumer consumer, LocalDateTime deletedAt) {

        consumer.updateDeletedAt(deletedAt);
    }

    @Transactional
    public void logout(HttpServletRequest request, HttpServletResponse response) {

        cookieUtil.getCookie(request, REFRESH_TOKEN_COOKIE_NAME) // 쿠키에서 리프레시 토큰 찾기
                .ifPresent(c -> refreshTokenRepository.findByRefreshToken(c.getValue())
                        .ifPresent(refreshTokenRepository::delete)); // Redis 삭제

        // 쿠키 삭제
        cookieUtil.deleteCookie(request, response, ACCESS_TOKEN_COOKIE_NAME);
        cookieUtil.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);
    }

    private boolean existsByNickname(String nickname) {

        return consumerRepository.existsByNicknameAndDeletedAtIsNull(nickname);
    }

    private Consumer findBySocialTypeAndEmail(OAuth2Provider socialType, String email) {

        return consumerRepository.findBySocialTypeAndEmailAndDeletedAtIsNull(socialType, email)
                .orElse(null);
    }

    private Consumer findBySecurityContext() {
        return consumerRepository.findByIdAndDeletedAtIsNull(securityUtil.getConsumer().getId())
                .orElseThrow(() -> new BusinessException(CONSUMER_NOT_FOUND));
    }
}
