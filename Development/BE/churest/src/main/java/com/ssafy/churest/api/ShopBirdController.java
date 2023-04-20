package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.MemberBirdRequestDto;
import com.ssafy.churest.service.MemberBirdService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("Shop Bird Controller API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/shop/bird")
public class ShopBirdController {

    private final MemberBirdService memberBirdService;

    @ApiOperation(value = "상점 새 목록", notes = "상점 내에 표시할 새 목록 불러오기")
    @GetMapping("")
    public ResponseEntity<?> birdList(@RequestParam int memberId) {
        try {
            return new ResponseEntity<>(memberBirdService.getBirdList(memberId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "새 구매", notes = "새 구매하기 \n" +
            "구매 가능할 때는 HttpStatus.OK와 함께 새로운 목록\n" +
            "잔액 부족으로 구매 불가능할 때는 HttpStatus.ACCEPTED")
    @PostMapping("")
    public ResponseEntity<?> purchaseBird(@RequestBody MemberBirdRequestDto.Purchase purchaseInfo) {
        try {
            // 새를 사고 남은 잔액이 0원보다 크거나 같을 때만 구매
            int change = memberBirdService.availablePurchase(purchaseInfo.getMemberId(), purchaseInfo.getBirdId());
            if(change >= 0)
                return new ResponseEntity<>(memberBirdService.purchaseBird(purchaseInfo.getMemberId(), purchaseInfo.getBirdId(), change), HttpStatus.OK);
            else
                return new ResponseEntity<>("잔액 부족", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "새 바꾸기", notes = "다른 새로 장착")
    @PutMapping("")
    public ResponseEntity<?> changeBird(@RequestParam int memberId, @RequestParam int birdId) {
        try {
            memberBirdService.changeBird(memberId, birdId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
