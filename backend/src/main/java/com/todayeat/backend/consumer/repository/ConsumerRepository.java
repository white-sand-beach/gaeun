package com.todayeat.backend.consumer.repository;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConsumerRepository extends JpaRepository<Consumer, Long> {

    Optional<Consumer> findBySocialTypeAndEmailAndDeletedAtIsNull(OAuth2Provider socialType, String email);
    Optional<Consumer> findByIdAndDeletedAtIsNull(Long consumerId);
    boolean existsByNicknameAndDeletedAtIsNull(String nickname);
}
