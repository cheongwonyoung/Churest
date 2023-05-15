package com.ssafy.churest.util;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.Random;

import io.jsonwebtoken.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

@Component
@Slf4j
public class JwtTokenProvider {


    @Value("${jwt.access-token.expire-length}")
    private long  accessTokenTime;
    @Value("${jwt.refresh-token.expire-length}")
    private long  refreshTokenTime;
    @Value("${jwt.token.secret-key}")
    private String secretKey;

    private final UserDetailsService userDetailsService;

    public JwtTokenProvider(@Qualifier("userUserDetailsService") UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }



    // Jwt 토큰 생성
    public String createToken(String email, String type) {
        Claims claims = Jwts.claims().setSubject(email);
        Date now = new Date();
        long validTime = 0;
        if(type.equals("access")){
            validTime = accessTokenTime;
            return Jwts.builder()
                    .setClaims(claims) // 데이터
                    .setIssuedAt(now)   // 토큰 발행 일자
                    .setExpiration(new Date(now.getTime() + validTime)) // 만료 기간
                    .signWith(SignatureAlgorithm.HS512, secretKey) // 암호화 알고리즘, secret 값
                    .compact(); // Token 생성
        }
        validTime = refreshTokenTime;
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)   // 토큰 발행 일자
                .setExpiration(new Date(now.getTime() + validTime)) // 만료 기간
                .signWith(SignatureAlgorithm.HS512, secretKey) // 암호화 알고리즘, secret 값
                .compact(); // Token 생성
    }

    // 인증 성공시 SecurityContextHolder에 저장할 Authentication 객체 생성
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getEmail(token));
        log.info("여기", userDetails.getUsername());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // Jwt Token에서 User Email 추출
    public String getEmail(String token) {
        return Jwts.parser().setSigningKey(secretKey)
                .parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest req) {
        return req.getHeader("X-AUTH-TOKEN");
    }

    // Jwt Token의 유효성 및 만료 기간 검사
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

}