package com.todayeat.backend.consumer.service;

import com.todayeat.backend._common.refreshtoken.repository.RefreshTokenRepository;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.dto.request.CheckNicknameRequest;
import com.todayeat.backend.consumer.dto.request.UpdateConsumerRequest;
import com.todayeat.backend.consumer.dto.response.CheckNicknameResponse;
import com.todayeat.backend.consumer.dto.response.GetConsumerResponse;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.consumer.mapper.ConsumerMapper;
import com.todayeat.backend.consumer.repository.ConsumerRepository;
import com.todayeat.backend._common.oauth2.dto.auth.OAuth2UserPrincipal;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2Provider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.todayeat.backend._common.response.error.ErrorType.NICKNAME_CONFLICT;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ConsumerService {

    private final ConsumerRepository consumerRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final SecurityUtil securityUtil;

    @Transactional
    public Long create(OAuth2UserPrincipal principal) {

        Consumer consumer = ConsumerMapper.INSTANCE.oAuth2UserResponseToConsumer(principal.getOAuth2UserResponse());
        consumerRepository.save(consumer);

        return consumer.getId();
    }

    @Transactional
    public void update(UpdateConsumerRequest request) {

        Consumer consumer = securityUtil.getConsumer();

        // 닉네임 중복 검사
        if (existsByNickname(request.getNickname()) && !consumer.getNickname().equals(request.getNickname())) {
            throw new BusinessException(NICKNAME_CONFLICT);
        }

        consumerRepository.findByIdAndDeletedAtIsNull(consumer.getId())
                .get().update(request);
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

        Consumer consumer = securityUtil.getConsumer();
        return ConsumerMapper.INSTANCE.consumerToGetConsumerResponse(consumer);
    }

    @Transactional
    public void delete(OAuth2Provider socialType, String email) {

        Consumer consumer = findBySocialTypeAndEmail(socialType, email);

        // 리프레시 토큰 삭제
        refreshTokenRepository.findByMemberIdAndRole(consumer.getId(), "CONSUMER")
                        .forEach(r -> refreshTokenRepository.delete(r));

        // DB 삭제
        consumerRepository.delete(consumer);
    }

    private boolean existsByNickname(String nickname) {

        return consumerRepository.existsByNicknameAndDeletedAtIsNull(nickname);
    }

    private Consumer findBySocialTypeAndEmail(OAuth2Provider socialType, String email) {

        return consumerRepository.findBySocialTypeAndEmailAndDeletedAtIsNull(socialType, email)
                .orElse(null);
    }
}
