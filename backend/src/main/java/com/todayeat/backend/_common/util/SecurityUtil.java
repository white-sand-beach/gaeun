package com.todayeat.backend._common.util;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.seller.entity.Seller;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {

    public Consumer getConsumer() {

        return (Consumer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Seller getSeller() {

        return (Seller) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public String getPrincipalClassSimpleName() {

        return SecurityContextHolder.getContext().getAuthentication().getPrincipal().getClass().getSimpleName();
    }
}
