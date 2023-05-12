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
@RequestMapping("/api/member")
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

    @ApiOperation(value = "access token 재발급", notes = "refresh token을 받아 유효하면 access token 재발급")
    @GetMapping("/token")
    public ResponseEntity<?> token(@RequestParam String refreshToken) {
        try {
            String acceesToken = memberService.token(refreshToken);

            return new ResponseEntity<>(acceesToken, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @ApiOperation(value = "avatarNickname 중복체크", notes = "사용중인 닉네임이면 true 반환")
    @GetMapping("/avatarNickname")
    public ResponseEntity<?> avatarNickname(@RequestParam String nickname) {
        try {
            Boolean result = memberService.checkAvatar(nickname);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
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
