package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.MemberBirdRequestDto;
import com.ssafy.churest.service.MemberBirdService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("my Bird Controller API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/my-bird")
public class MemberBirdController {

    private final MemberBirdService memberBirdService;

    @ApiOperation(value = "보유한 새 목록", notes = "사용자가 보유한 새 목록 불러오기")
    @GetMapping("")
    public ResponseEntity<?> getMyBirdList(@RequestParam int memberId) {
        try {
            return new ResponseEntity<>(memberBirdService.getMyBirdList(memberId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "새 닉네임 변경", notes = "보유한 새의 닉네임 변경")
    @PutMapping("")
    public ResponseEntity<?> updateBirdNickname(@RequestBody MemberBirdRequestDto.UpdateNickname updateInfo) {
        try {
            return new ResponseEntity<>(memberBirdService.updateBirdNickname(updateInfo.getMemberBirdId(), updateInfo.getNickname()), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
