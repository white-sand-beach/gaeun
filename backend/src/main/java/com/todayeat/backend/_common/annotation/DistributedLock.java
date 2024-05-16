package com.todayeat.backend._common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.TimeUnit;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface DistributedLock {

    String key(); // 락의 이름

    TimeUnit timeUnit() default TimeUnit.SECONDS; // 락의 시간 단위

    long waitTime() default 5L; // 락을 기다리는 시간 (5초)

    long leaseTime() default 3L; // 락을 임대하는 시간 (3초)
}
