package com.todayeat.backend.refreshtoken.repository;

import com.todayeat.backend.refreshtoken.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {

    Optional<RefreshToken> findByRefreshToken(String refreshToken);
    Optional<RefreshToken> findByMemberIdAndRole(Long memberId, String role);
}
