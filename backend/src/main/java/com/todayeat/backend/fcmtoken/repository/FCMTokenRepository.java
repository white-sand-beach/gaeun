package com.todayeat.backend.fcmtoken.repository;


import com.todayeat.backend.fcmtoken.entity.FCMToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FCMTokenRepository extends CrudRepository<FCMToken, String> {

    Optional<FCMToken> findByMemberIdAndRole(Long memberId, String role);
}
