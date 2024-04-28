package com.todayeat.backend._common.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class executionTimeAspect {

    @Around("execution(* com..backend..service.*.*(..))")
    public Object logServiceMethodExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {

        return logExecutionTime(joinPoint, "\u001B[96m");
    }

    private Object logExecutionTime(ProceedingJoinPoint joinPoint, String color) throws Throwable {

        long startTime = System.currentTimeMillis();
        log.info("{}[{}.{}]", color, joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName());

        Object result = joinPoint.proceed();

        long endTime = System.currentTimeMillis();
        long executionTime = endTime - startTime;
        log.info("{}실행 시간: {}ms", color, executionTime);

        return result;
    }
}