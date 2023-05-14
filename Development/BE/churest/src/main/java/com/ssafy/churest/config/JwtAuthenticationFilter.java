package com.ssafy.churest.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.churest.util.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
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
public class JwtAuthenticationFilter extends GenericFilterBean {

    private JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // Request로 들어오는 Jwt Token의 유효성을 검증하는 filter를 filterChain에 등록합니다.
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {


        String token = jwtTokenProvider.resolveToken((HttpServletRequest) servletRequest);
//        logger.info("come here !!!! "+ token);
        if(token != null & jwtTokenProvider.validateToken(token)){
//            try{

                // token 검증
//                logger.info("come here1 !!!! "+ token);
                Authentication auth = jwtTokenProvider.getAuthentication(token);    // 인증 객체 생성
//                logger.info("come here2 !!!! "+ token);
                SecurityContextHolder.getContext().setAuthentication(auth); // SecurityContextHolder에 인증 객체 저장
//                logger.info("come here3 !!!! "+ token);
//            }
//            catch(ExpiredJwtException jwtException){
//                logger.info("토큰 만료");
//
//                ObjectMapper mapper = new ObjectMapper();
//
//                HttpServletResponse response = (HttpServletResponse) servletResponse;
//                response.setStatus(HttpStatus.UNAUTHORIZED.value());
//                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//                response.setCharacterEncoding("UTF-8");
//
//                ResponseStatusException responseStatusException = new ResponseStatusException(
//                        HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다.");
//
//                mapper.writeValue(response.getWriter(), responseStatusException);
//
//            }catch (Exception exception) {
//                logger.info("jwtException : 잘못된 토큰이 들어왔음");
//                throw exception;
//            }

        }

        else{
//            logger.info("?????");
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
};