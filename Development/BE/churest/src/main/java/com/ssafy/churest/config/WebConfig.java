package com.ssafy.churest.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
    @RequiredArgsConstructor
    public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedHeaders("Origin", "Content-Type", "Accept", "X-AUTH-TOKEN", "Authorization")
//                    .allowedHeaders("*")
//                    .allowedOrigins("*")
                .allowedOrigins("*","http://localhost:8080", "http://localhost:3000"
                        , "https://k8a505.p.ssafy.io", "https://k8a505.p.ssafy.io:80", "https://k8a505.p.ssafy.io:8080", "https://k8a505.p.ssafy.io:3000", "http://k8a505.p.ssafy.io", "http://k8a505.p.ssafy.io:80", "http://k8a505.p.ssafy.io:8080", "http://k8a505.p.ssafy.io:3000")
//                .allowCredentials(true)
                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE", "PATCH");
    }
}
