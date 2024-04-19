package com.todayeat.backend._common.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import java.util.HashMap;

@Configuration
@OpenAPIDefinition(
        servers = @Server(url = "${base-url}", description = "server base url"),
        info = @Info(
                title = "🍽 오늘 잡슈 API",
                description = """
                          이 API는 유효한 `accessToken`이 필요합니다. API를 호출할 때는 `accessToken`을 HTTP 헤더에 포함시켜야 합니다. \n
                          예시:\n
                          headers: { \n
                             Authorization: 'Bearer ${accessToken}'\n
                          }\n
                         Swagger UI를 사용하여 API를 테스트하는 경우, 우측 상단의 'Authorize' 버튼을 클릭하고 'Bearer ${accessToken}' 형태로 토큰을 입력한 후 API를 테스트할 수 있습니다.\n
                        """
                ,
                version = "1.0"
        ),
        security = @SecurityRequirement(name = HttpHeaders.AUTHORIZATION)
)
@SecurityScheme(
        name = HttpHeaders.AUTHORIZATION,
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
@SecurityScheme(
        name = "RefreshToken",
        type = SecuritySchemeType.HTTP,
        scheme = "cookie",
        in = SecuritySchemeIn.COOKIE
)

public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        OpenAPI openAPI = new OpenAPI();

        openAPI.setExtensions(new HashMap<>());
        openAPI.getExtensions().put("doc-expansion", "none");
        openAPI.getExtensions().put("tags-sorter", "alpha");
        openAPI.getExtensions().put("operationsSorter", "method");

        return openAPI;
    }

}