package com.todayeat.backend._common.util;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.consumer.repository.ConsumerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import static com.todayeat.backend._common.response.error.ErrorType.CONSUMER_NOT_FOUND;
import static com.todayeat.backend._common.response.error.ErrorType.TOKEN_NOT_FOUND;

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

        try {
            return Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        } catch (NumberFormatException e) {
            throw new BusinessException(TOKEN_NOT_FOUND);
        }
    }
}
