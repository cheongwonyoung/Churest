package com.ssafy.churest.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.repository.MemberRepository;
import com.ssafy.churest.util.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

@Component
@Getter
@Slf4j
public class JwtAuthenticationFilter  extends OncePerRequestFilter {
    private final MemberRepository memberRepository;

    private JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider,
                                   MemberRepository memberRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberRepository = memberRepository;
    }

    // Request로 들어오는 Jwt Token의 유효성을 검증하는 filter를 filterChain에 등록합니다.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            //Token에서 Claim 꺼내기
                String authorizationHeader = request.getHeader("Authorization");
            if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){      //header에 AUTHORIZATION이 없거나, Bearer로 시작하지 않으면 filter
                log.error("header가 없거나, 형식이 틀립니다. - {}", authorizationHeader);
                filterChain.doFilter(request, response);
                return;
            }

            String token;
            try {
                token = authorizationHeader.split(" ")[1].trim();
            } catch (Exception e) {
                log.error("토큰을 분리하는데 실패했습니다. - {}", authorizationHeader);
                filterChain.doFilter(request, response);
                return;
            }

            //토큰이 Valid한지 확인하기 (유효하지 않으면)
            if(!jwtTokenProvider.validateToken(token)){
                filterChain.doFilter(request, response);
                return;
            }

            Authentication auth = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
            filterChain.doFilter(request, response);

        }

    }