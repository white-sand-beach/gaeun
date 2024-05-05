package com.todayeat.backend._common.refreshtoken.repository;

import com.todayeat.backend._common.refreshtoken.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {

    Optional<RefreshToken> findByRefreshToken(String refreshToken);
    List<RefreshToken> findByMemberIdAndRole(Long memberId, String role);
}
