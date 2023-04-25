package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.MemberHouseRequestDto;
import com.ssafy.churest.service.MemberHouseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("shop house Controller API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/shop/house")
public class ShopHouseController {
    private final MemberHouseService memberHouseService;
    @ApiOperation(value = "집 목록", notes = "상점 내에 표시할 집 목록 불러오기")
    @GetMapping("")
    public ResponseEntity<?> getHouseList(@RequestParam int memberId) {
        try {
            return new ResponseEntity<>(memberHouseService.getHouseList(memberId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "집 구매", notes = "집 구매하기 \n" +
            "구매 가능할 때는 HttpStatus.OK와 함께 새로운 목록\n" +
            "잔액 부족으로 구매 불가능할 때는 HttpStatus.ACCEPTED")
    @PostMapping("")
    public ResponseEntity<?> purchaseHouse(@RequestBody MemberHouseRequestDto.PurchaseOrChange info) {
        try {
            // 집을 사고 남은 잔액이 0원보다 크거나 같을 때만 구매
            int change = memberHouseService.availablePurchase(info.getMemberId(), info.getHouseId());
            if(change >= 0)
                return new ResponseEntity<>(memberHouseService.purchaseHouse(info.getMemberId(), info.getHouseId(), change), HttpStatus.OK);
            else
                return new ResponseEntity<>("잔액 부족", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "집 바꾸기", notes = "다른 집으로 장착")
    @PutMapping("")
    public ResponseEntity<?> changeHouse(@RequestBody MemberHouseRequestDto.PurchaseOrChange info) {
        try {
            memberHouseService.changeHouse(info.getMemberId(), info.getHouseId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
