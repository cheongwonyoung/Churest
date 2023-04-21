package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.MyPageRequestDto;
import com.ssafy.churest.service.MyPageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api("MyPageController API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/myPage")
public class MyPageController {

    private final MyPageService myPageService;

    @ApiOperation(value = "닉네임 바꾸기", notes = "다른 닉네임으로 변경")
    @PutMapping("/nickname")
    public ResponseEntity<?> changeNickname(@RequestBody MyPageRequestDto.UpdateNickname info) {
        try {
            myPageService.updateNickname(info);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "아바타 바꾸기", notes = "다른 아바타로 변경")
    @PutMapping("/avatar")
    public ResponseEntity<?> changeAvatar(@RequestBody MyPageRequestDto.UpdateAvatar info) {
        try {
            myPageService.updateAvatar(info);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
