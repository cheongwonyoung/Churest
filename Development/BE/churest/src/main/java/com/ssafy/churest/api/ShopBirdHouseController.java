package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.MemberBirdHouseRequestDto;
import com.ssafy.churest.dto.req.MemberHouseRequestDto;
import com.ssafy.churest.service.MemberBirdHouseService;
import com.ssafy.churest.service.MemberHouseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("shop bird house Controller API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shop/bird-house")
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

    @ApiOperation(value = "새집 구매", notes = "새집 구매하기 \n" +
            "구매 가능할 때는 HttpStatus.OK와 함께 새로운 목록\n" +
            "잔액 부족으로 구매 불가능할 때는 HttpStatus.ACCEPTED")
    @PostMapping("")
    public ResponseEntity<?> purchaseBirdHouse(@RequestBody MemberBirdHouseRequestDto.PurchaseOrChange info) {
        try {
            // 집을 사고 남은 잔액이 0원보다 크거나 같을 때만 구매
            int change = memberBirdHouseService.availablePurchase(info.getMemberId(), info.getBirdHouseId());
            if(change >= 0)
                return new ResponseEntity<>(memberBirdHouseService.purchaseBirdHouse(info.getMemberId(), info.getBirdHouseId(), change), HttpStatus.OK);
            else
                return new ResponseEntity<>("잔액 부족", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "새집 바꾸기", notes = "다른 새집으로 장착")
    @PutMapping("")
    public ResponseEntity<?> changeBirdHouse(@RequestBody MemberHouseRequestDto.PurchaseOrChange info) {
        try {
            memberBirdHouseService.changeBirdHouse(info.getMemberId(), info.getHouseId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
