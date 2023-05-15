package com.ssafy.churest.api;

import com.ssafy.churest.service.BirdService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("birdController API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bird")
public class BirdController {

    private final BirdService birdService;

    @ApiOperation(value = "새 목록", notes = "회원가입할 때 선택할 새 목록 불러오기")
    @GetMapping("")
    public ResponseEntity<?> birdList() {
        try {
            return new ResponseEntity<>(birdService.getBirdList(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
