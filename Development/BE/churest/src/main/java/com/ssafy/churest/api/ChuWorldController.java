package com.ssafy.churest.api;

import com.ssafy.churest.service.ForestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("ChuWorldController API v1")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chuworld")
public class ChuWorldController {

    private final ForestService forestService;

    @ApiOperation(value = "츄월드 조회", notes = "남의 숲 둘러보기")
    @GetMapping()
    public ResponseEntity<?> getForest(@ApiParam(value = "내 memberId", required = true) @RequestParam(value = "memberId") int memberId){
        try{
            return new ResponseEntity<>(forestService.getOtherForestList(memberId), HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
