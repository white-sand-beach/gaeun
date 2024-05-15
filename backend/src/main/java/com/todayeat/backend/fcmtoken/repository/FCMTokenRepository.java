package com.todayeat.backend.fcmtoken.repository;


import com.todayeat.backend.fcmtoken.entity.FCMToken;
import org.springframework.data.repository.CrudRepository;

public interface FCMTokenRepository extends CrudRepository<FCMToken, String> {
}
