package com.ssafy.churest.api;

import com.ssafy.churest.service.GuestBookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api("GuestBookController API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/guestBook")
public class GuestBookController {

    private final GuestBookService guestBookService;
    @ApiOperation(value = "방명록 목록", notes = "우체통 눌렀을 때 띄울 방명록 목록")
    @GetMapping("")
    public ResponseEntity<?> getGuestBookList(@RequestParam int memberId) {
        try {
            return new ResponseEntity<>(guestBookService.getGuestBookList(memberId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
