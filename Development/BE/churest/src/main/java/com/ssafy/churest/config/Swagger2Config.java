package com.ssafy.churest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableSwagger2
public class Swagger2Config {

    private static final String API_NAME = "Trade Talk API";
    private static final String API_VERSION = "1.0";
    private static final String API_DESCRIPTION = "Trade Talk 서버 API 문서";

    @Bean
    public Docket api() {

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo()) // API 문서에 대한 내용
                .securityContexts(Arrays.asList(securityContext())) // swagger에서 jwt 토큰값 넣기위한 설정
                .securitySchemes(Arrays.asList(apiKey())) // swagger에서 jwt 토큰값 넣기위한 설정
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.churest")) // Swagger를 적용할 package명 작성
                .paths(PathSelectors.any()) // PathSelectors.any() 해당패키지 하위에 있는 모든 url에 적용, 특정 url만 선택 가능
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("CHUREST API v1")
                .version("1.0")
                .description("CHUREST API입니다.")
//                .license("라이센스 작성")
//                .licenseUrl("라이센스 URL 작성")
                .build();
    }

    // swagger에서 jwt 토큰값 넣기위한 설정
    private ApiKey apiKey() {
        return new ApiKey("Authorization", "Authorization", "Authorization");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder().securityReferences(defaultAuth()).build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("Authorization", authorizationScopes));
    }
}