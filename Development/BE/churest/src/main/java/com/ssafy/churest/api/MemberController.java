package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.MemberBirdRequestDto;
import com.ssafy.churest.dto.req.MemberRequestDto;
import com.ssafy.churest.dto.resp.LoginResponseDto;
import com.ssafy.churest.dto.resp.MemberResponseDto;
import com.ssafy.churest.service.MemberBirdService;
import com.ssafy.churest.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("my Member Controller API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @ApiOperation(value = "카카오 소셜 로그인", notes = "카카오 소셜 아이디를 이용한 토큰발급")
    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String code) {
        try {

            LoginResponseDto loginResponse = memberService.login(code);

            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "회원가입", notes = "유저, 새 정보 수정")
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody MemberRequestDto.Join joinInfo) {
        try {

            MemberResponseDto.MemberInfo joinResponse = memberService.join(joinInfo);

            return new ResponseEntity<>(joinResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "test", notes = "test")
    @GetMapping("/test")
    public ResponseEntity<?> test(@RequestParam String code) {
        try {

            return new ResponseEntity<>(code, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
