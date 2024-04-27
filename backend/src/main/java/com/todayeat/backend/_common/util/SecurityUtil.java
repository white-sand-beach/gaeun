package com.todayeat.backend._common.util;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.consumer.repository.ConsumerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import static com.todayeat.backend._common.response.error.ErrorType.*;

@Component
@RequiredArgsConstructor
public class SecurityUtil {

    private final ConsumerRepository consumerRepository;

    public Long getConsumerId() {

        Long consumerId = getConsumerIdOrElseThrow();

        if (consumerRepository.existsByIdAndDeletedAtIsNull(consumerId)) {
            return consumerId;
        }

        throw new BusinessException(CONSUMER_NOT_FOUND);
    }

    public Consumer getConsumer() {

        return consumerRepository.findByIdAndDeletedAtIsNull(getConsumerIdOrElseThrow())
                .orElseThrow(() -> new BusinessException(CONSUMER_NOT_FOUND));
    }

    private Long getConsumerIdOrElseThrow() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long consumerId;

        // 토큰 확인
        try {
            consumerId = Long.valueOf(authentication.getName());
        } catch (NumberFormatException e) {
            throw new BusinessException(TOKEN_NOT_FOUND);
        }

        // 권한 확인
        authentication.getAuthorities().stream()
                .filter(g -> g.getAuthority().equals("ROLE_CONSUMER"))
                .findFirst()
                .orElseThrow(() -> new BusinessException(ROLE_MISMATCH));

        return consumerId;
    }
}
