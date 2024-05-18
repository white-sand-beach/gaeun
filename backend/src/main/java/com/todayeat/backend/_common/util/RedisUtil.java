package com.todayeat.backend._common.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate<String, String> redisTemplate;

    public void setKeyValue(String key, String value, long timeoutMillis) {

        redisTemplate.opsForValue().set(key, value, timeoutMillis, TimeUnit.MILLISECONDS);
    }

    public String getValueByKey(String key) {

        return redisTemplate.opsForValue().get(key);
    }
}
