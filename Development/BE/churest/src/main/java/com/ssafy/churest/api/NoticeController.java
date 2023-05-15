package com.ssafy.churest.api;

import com.ssafy.churest.service.NoticeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("my Notice Controller API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @ApiOperation(value = "전체 알림 조회", notes = "memberId를 받아 전체 알림 조회 \n")
    @GetMapping("")
    public ResponseEntity<?> search(@ApiParam(value = "내 memberId", required = true) @RequestParam int memberId) {
        try {
            return new ResponseEntity<>(noticeService.saerch(memberId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @ApiOperation(value = "알림 읽음 처리", notes = "noticeId를 받아 읽음 처리 수정 \n")
    @PostMapping("")
    public ResponseEntity<?> check(@ApiParam(value = "읽은 알림 noticeId", required = true) @RequestParam int noticeId) {
        try {
            noticeService.check(noticeId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
