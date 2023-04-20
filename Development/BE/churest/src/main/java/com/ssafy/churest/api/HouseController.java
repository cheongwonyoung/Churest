package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.MemberBirdRequestDto;
import com.ssafy.churest.service.HouseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("house Controller API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/house")
public class HouseController {
    private final HouseService houseService;
    @ApiOperation(value = "집 목록", notes = "상점 내에 표시할 집 목록 불러오기")
    @GetMapping("")
    public ResponseEntity<?> getHouseList(@RequestParam int memberId) {
        try {
            return new ResponseEntity<>(houseService.getHouseList(memberId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
