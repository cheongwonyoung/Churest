package com.ssafy.churest.api;

import com.ssafy.churest.service.SquareService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("SquareController API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/square")
public class SquareController {

    private final SquareService squareService;

    @ApiOperation(value = "기부 현황 조회", notes = "전체 기부 나무 그루 수 및 memberId에 해당하는 기부 나무 그루 수 조회")
    @GetMapping("")
    public ResponseEntity<?> getForest(@RequestParam int memberId){
        try{
            return new ResponseEntity<>(squareService.getDonateInfo(memberId), HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
