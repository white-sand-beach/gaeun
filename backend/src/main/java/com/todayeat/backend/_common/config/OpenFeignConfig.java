package com.todayeat.backend._common.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients("com.todayeat.backend")
public class OpenFeignConfig {

}