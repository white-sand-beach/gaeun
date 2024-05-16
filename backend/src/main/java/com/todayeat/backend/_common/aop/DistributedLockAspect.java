package com.todayeat.backend._common.aop;

import com.todayeat.backend._common.annotation.DistributedLock;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class DistributedLockAspect {

    private final RedissonClient redissonClient;
    private final AopForTransaction aopForTransaction;

    @Around("@annotation(com.todayeat.backend._common.annotation.DistributedLock)")
    public Object lock(ProceedingJoinPoint joinPoint) throws Throwable {

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        DistributedLock distributedLock = method.getAnnotation(DistributedLock.class);

        String key = "LOCK:" + getKey(signature.getParameterNames(), joinPoint.getArgs(), distributedLock.key());

        RLock rLock = redissonClient.getLock(key);
        String lockName = rLock.getName();

        try {
            boolean available = rLock.tryLock(
                                    distributedLock.waitTime(),
                                    distributedLock.leaseTime(),
                                    distributedLock.timeUnit());

            if (!available) {
                log.error("DistributedLock is not available!");
                throw new BusinessException(ErrorType.INTERNAL_SERVER_ERROR);
            }

            log.info("distributed lock : {}", key);

            // 부모 트랜잭션의 유무에 관계없이 별도의 트랜잭션으로 동작
            return aopForTransaction.proceed(joinPoint);
        } catch (InterruptedException e) {

            log.error("DistributedLock throws InterruptedException : {}", e.getMessage());
            throw new BusinessException(ErrorType.INTERNAL_SERVER_ERROR);
        } finally {

            // 트랜잭션 커밋 이후 락을 해제
            try {
                rLock.unlock();
                log.info("unlock complete : {}", lockName);
            } catch (IllegalMonitorStateException e) {
                log.info("unlock already completed");
            }
        }
    }

    private Object getKey(String[] parameterNames, Object[] args, String key) {

        ExpressionParser parser = new SpelExpressionParser();
        StandardEvaluationContext context = new StandardEvaluationContext();

        for (int i = 0; i < parameterNames.length; i++) {
            context.setVariable(parameterNames[i], args[i]);
        }

        return parser.parseExpression(key).getValue(context, Object.class);
    }
}
