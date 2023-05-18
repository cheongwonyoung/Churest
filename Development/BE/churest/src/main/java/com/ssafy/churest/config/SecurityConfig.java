package com.ssafy.churest.config;

//import com.ssafy.churest.service.CustomOAuth2UserService;
import com.ssafy.churest.repository.MemberRepository;
import com.ssafy.churest.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    public SecurityConfig(JwtTokenProvider jwtTokenProvider, MemberRepository memberRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberRepository = memberRepository;
    }

    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .httpBasic().disable()
                .csrf().disable();
        http
                .authorizeRequests()
//                 .antMatchers("/api/member/login", "/api/member/token", "/chat/**", "/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**","/swagger-ui/**")
//                 .anonymous()
               .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and().cors().configurationSource(corsConfigurationSource())
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, memberRepository), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint());
    }

    // CORS 허용 적용
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*"); 
        // cors policy
        configuration.addExposedHeader("Access-Control-Allow-Origin");

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
