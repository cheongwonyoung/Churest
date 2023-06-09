package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.MyPageRequestDto;
import com.ssafy.churest.service.MyPageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("MyPageController API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-page")
public class MyPageController {

    private final MyPageService myPageService;

    @ApiOperation(value = "마이페이지 정보", notes = "내 아바타, 닉네임 정보와 츄레스트에 작성된 글 목록 불러오기 \n" +
            "작성된 글 눌렀을 때 score가 16 이상이면 나무 정보 가져옴")
    @GetMapping("")
    public ResponseEntity<?> getMyPageInfo(@RequestParam int memberId) {
        try {
            return new ResponseEntity<>(myPageService.getMyPageInfo(memberId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @ApiOperation(value = "마이페이지 추억 나무 정보", notes = "작성된 글 눌렀을 때 score가 16 이상이면 나무 정보 가져옴 \n" +
//            "score가 16 미만이면 HttpStatus.ACCEPT 반환 \n" +
//            "score가 16 이상이면 HttpStatus.OK 반환")
//    @GetMapping("/tree")
//    public ResponseEntity<?> getBoardTreeInfo(@RequestParam int boardId) {
//        try {
//            if(myPageService.getScore(boardId) >= 16)
//                return new ResponseEntity<>(myPageService.getBoardTreeInfo(boardId), HttpStatus.OK);
//            else
//                return new ResponseEntity<>("socre 부족", HttpStatus.ACCEPTED);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

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
