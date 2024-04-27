package com.todayeat.backend.consumer.service;

import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.dto.request.UpdateConsumerRequest;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.consumer.mapper.ConsumerMapper;
import com.todayeat.backend.consumer.repository.ConsumerRepository;
import com.todayeat.backend.oauth2.dto.auth.OAuth2UserPrincipal;
import com.todayeat.backend.oauth2.dto.response.OAuth2Provider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ConsumerService {

    private final ConsumerRepository consumerRepository;
    private final SecurityUtil securityUtil;

    @Transactional
    public Long create(OAuth2UserPrincipal principal) {

        log.info("[ConsumerService.create]");

        Consumer consumer = ConsumerMapper.INSTANCE.oAuth2PrincipalToConsumer(principal.getUserInfo());
        consumerRepository.save(consumer);

        return consumer.getId();
    }

    @Transactional
    public void update(UpdateConsumerRequest request) {

        log.info("[ConsumerService.update]");

        Consumer consumer = securityUtil.getConsumer();
        consumer.update(request);
    }

    public Consumer getConsumerOrNull(OAuth2Provider socialType, String email) {
        return consumerRepository.findBySocialTypeAndEmail(socialType, email)
                .orElse(null);
    }
}
