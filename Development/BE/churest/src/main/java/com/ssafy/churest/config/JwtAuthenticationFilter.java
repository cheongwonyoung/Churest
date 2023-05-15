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

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            //Token에서 Claim 꺼내기

                log.info(request.getHeader("Authorization"));

//            if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){      //header에 AUTHORIZATION이 없거나, Bearer로 시작하지 않으면 filter
//                log.error("header가 없거나, 형식이 틀립니다. - {}", authorizationHeader);
//                filterChain.doFilter(request, response);
//                return;
//            }
//
//            String token;
//            try {
//                token = authorizationHeader.split(" ")[1].trim();
//            } catch (Exception e) {
//                log.error("토큰을 분리하는데 실패했습니다. - {}", authorizationHeader);
//                filterChain.doFilter(request, response);
//                return;
//            }
//            log.info("token : {}", token);
//
//            //토큰이 Valid한지 확인하기
//            if(JwtTokenUtil.isExpired(token, secretKey)){
//                filterChain.doFilter(request, response);
//                return;
//            }
//
//            //userName 넣기, 문 열어주기
//            String userName = JwtTokenUtil.getUserName(token, secretKey);
//            log.info("userName : {}", userName);
//            User user = userService.getUserByUserName(userName);
//
//            //AuthenticationToken 만들기
//            UsernamePasswordAuthenticationToken authenticationToken =  new UsernamePasswordAuthenticationToken(user.getUserName(), null, List.of(new SimpleGrantedAuthority(user.getRole().name())));
//            //디테일 설정하기
//            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        }

    }

    // Request로 들어오는 Jwt Token의 유효성을 검증하는 filter를 filterChain에 등록합니다.
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        log.info(servletRequest.toString());
//        String token = jwtTokenProvider.resolveToken((HttpServletRequest) servletRequest);
//        if(token != null){
//            if(jwtTokenProvider.validateToken(token)){
//                // token 검증
//                Authentication auth = jwtTokenProvider.getAuthentication(token);    // 인증 객체 생성
//                SecurityContextHolder.getContext().setAuthentication(auth); // SecurityContextHolder에 인증 객체 저장
//            }
//            // access token이 만료되었을 경우 fcm 토큰 초기화
//            else{
//                Member member= memberRepository.findByEmail(jwtTokenProvider.getEmail(token));
//                member.setFcmToken(null);
//                memberRepository.save(member);
//            }
//        }
//        filterChain.doFilter(servletRequest, servletResponse);
//    }

//};