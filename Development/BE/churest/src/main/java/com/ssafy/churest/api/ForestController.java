package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.BoardRequestDto;
import com.ssafy.churest.dto.resp.MemberResponseDto;
import com.ssafy.churest.service.BoardService;
import com.ssafy.churest.service.ForestService;
import com.ssafy.churest.service.MemberService;
import com.ssafy.churest.service.TreeLogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

@Api("ForestController API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/forest")
public class ForestController {

    private final ForestService forestService;
    private final BoardService boardService;
    private final TreeLogService treeLogService;
    private final MemberService memberService;


    //  숲 정보 API // 나 또는 친구 숲
    @ApiOperation(value = "숲 조회", notes = "memberId에 해당하는 숲 입장 시 관련 데이터 조회")
    @GetMapping("/{memberId}")
    public ResponseEntity<?> getForest(@PathVariable int memberId){
        try{
            return new ResponseEntity<>(forestService.getForestInfo(memberId), HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  추억 나무 생성 시 닉네임 조회 API
    @ApiOperation(value = "닉네임 조회", notes = "추억 나무 생성 시 태그할 친구 닉네임 조회 \n")
    @GetMapping("/search/{nickname}")
    public ResponseEntity<?> searchFriend(@ApiParam(value = "내 memberId", required = true) @RequestParam int memberId, @PathVariable String nickname){
        try {
            List<MemberResponseDto.FriendSearchInfo> friendSearchList = memberService.getSearchMemberList(nickname, memberId);
            if(friendSearchList.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(friendSearchList, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  해당 위치 추억 나무 생성 가능 여부 API
//    @ApiOperation(value = "해당 위치 추억 나무 생성 가능 여부", notes = "위치 좌표로 검색 \n" +
//            "해당 위치에 추억 나무 생성 시 위치 좌표 중심 ?까지 추억 나무 생성 불가")
//    @PostMapping("/{memberId}/checkLoc")
//    public ResponseEntity<?> checkTreeLocation(@ApiParam(value = "내 memberId", required = true) @PathVariable int memberId, @RequestBody BoardRequestDto.LocationInfo locationInfo){
//        try {
//            return new ResponseEntity<>(boardService.checkTreeLocation(memberId, locationInfo), HttpStatus.OK);
//        } catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    //  추억 나무 생성 API
    @ApiOperation(value = "추억 나무 생성", notes = "이전에 해당 위치 추억 나무 생성 가능 확인했다는 전제 하에 진행")
    @PostMapping("")
    public ResponseEntity<?> writeTree(@RequestParam(required = false) List<MultipartFile> fileList, @RequestPart BoardRequestDto.Write writeInfo){
        // 이전에 해당 위치 추억 나무 생성 가능 확인했다는 전제 하에 진행
        try {
            boardService.writeTree(fileList, writeInfo);
            return new ResponseEntity<>(HttpStatus.OK);
        }  catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  추억 나무 조회 API
    @ApiOperation(value = "추억 나무 조회", notes = "boardId에 해당하는 추억 나무 정보 조회 \n 물주기 버튼 유무(isTagged)")
    @GetMapping("/tree/{boardId}")
    public ResponseEntity<?> getTree(@ApiParam(value = "내 memberId", required = true) @RequestParam int memberId, @PathVariable int boardId){
        try {
            return new ResponseEntity<>(boardService.getBoardDetailInfo(memberId, boardId), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  추억 나무 퍼가기 API
    @ApiOperation(value = "추억 나무 퍼가기", notes = "이전에 해당 위치 추억 나무 생성 가능 확인했다는 전제 하에 진행\n boardId에 해당하는 추억 나무 내 숲으로 퍼가기")
    @PostMapping("/takeTree/{boardId}")
    public ResponseEntity<?> takeTree(@ApiParam(value = "내 memberId", required = true) @RequestParam int memberId, @PathVariable int boardId, @RequestBody BoardRequestDto.LocationInfo locationInfo){
        // 이전에 해당 위치 추억 나무 생성 가능 확인했다는 전제 하에 진행
        try {
            boardService.writeTreeFromFriend(memberId, boardId, locationInfo);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  추억 나무 물주기 API
    @ApiOperation(value = "추억 나무 물주기", notes = "태그된 추억 나무에 물주기 \n 오늘 날짜에 해당하는 갱신된 treeLog 하나 반환 \n isReward가 true일 경우 물주기로 인해 나무로 성장해서 포인트 받았다는 의미 ")
    @GetMapping("/wateringTree/{boardId}/{memberId}")
    public ResponseEntity<?> wateringTree(@ApiParam(value = "추억 나무 boardId", required = true) @PathVariable int boardId, @ApiParam(value = "memberId", required = true) @PathVariable int memberId){
        try {
            return new ResponseEntity<>(treeLogService.updateScoreByWatering(boardId, memberId), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
