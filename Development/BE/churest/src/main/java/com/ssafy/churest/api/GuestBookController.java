package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.GuestBookRequestDto;
import com.ssafy.churest.service.GuestBookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("GuestBookController API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/guest-book")
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

    @ApiOperation(value = "방명록 쓰기", notes = "상대방 츄레스트에 방명록 작성")
    @PostMapping("")
    public ResponseEntity<?> writeGuestBook(@RequestBody GuestBookRequestDto.Write writeInfo) {
        try {
            guestBookService.writeGuestBook(writeInfo);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "방명록 수정", notes = "상대방 츄레스트에 작성한 방명록 수정")
    @PutMapping("")
    public ResponseEntity<?> modifyGuestBook(@RequestBody GuestBookRequestDto.Modify modifyInfo) {
        try {
            if(!guestBookService.checkWriteMember(modifyInfo.getGuestBookId(), modifyInfo.getFromMemberId()))
                return new ResponseEntity<>("방명록 작성자와 수정하는 사람의 아이디가 다름", HttpStatus.ACCEPTED);
            return new ResponseEntity<>(guestBookService.modifyGuestBook(modifyInfo), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "방명록 삭제", notes = "상대방 츄레스트에 작성한 방명록 삭제")
    @DeleteMapping("")
    public ResponseEntity<?> deleteGuestBook(@RequestBody GuestBookRequestDto.Delete deleteInfo) {
        try {
            if(!guestBookService.checkWriteMember(deleteInfo.getGuestBookId(), deleteInfo.getFromMemberId()))
                return new ResponseEntity<>("방명록 작성자와 삭제하는 사람의 아이디가 다름", HttpStatus.ACCEPTED);
            guestBookService.deleteGuestBook(deleteInfo.getGuestBookId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
