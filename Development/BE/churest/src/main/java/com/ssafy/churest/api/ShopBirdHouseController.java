package com.ssafy.churest.api;

import com.ssafy.churest.service.MemberBirdHouseService;
import com.ssafy.churest.service.MemberHouseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api("shop bird house Controller API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/birdHouse")
public class ShopBirdHouseController {
    private final MemberBirdHouseService memberBirdHouseService;
    @ApiOperation(value = "집 목록", notes = "상점 내에 표시할 집 목록 불러오기")
    @GetMapping("")
    public ResponseEntity<?> getBirdHouseList(@RequestParam int memberId) {
        try {
            return new ResponseEntity<>(memberBirdHouseService.getBirdHouseList(memberId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
