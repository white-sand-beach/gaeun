package com.todayeat.backend.consumer.repository;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend._common.oauth2.dto.response.OAuth2Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ConsumerRepository extends JpaRepository<Consumer, Long> {

    Optional<Consumer> findBySocialTypeAndEmailAndDeletedAtIsNull(OAuth2Provider socialType, String email);

    Optional<Consumer> findByIdAndDeletedAtIsNull(Long consumerId);

    boolean existsByNicknameAndDeletedAtIsNull(String nickname);

    @Modifying
    @Query("update Consumer c " +
            "set c.profileImage = :imageUrl, c.nickname = :nickname, c.phoneNumber = :phoneNumber " +
            "where c.id = :consumerId")
    void updateConsumer(Long consumerId, String imageUrl, String nickname, String phoneNumber);
}
