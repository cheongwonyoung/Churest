package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.BoardRequestDto;
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
    @GetMapping("/{memberId}/{nickname}")
    public ResponseEntity<?> searchFriend(@ApiParam(value = "내 memberId", required = true) @PathVariable int memberId, @PathVariable String nickname){
        try {
            return new ResponseEntity<>(memberService.getSearchMemberList(nickname, memberId), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  해당 위치 추억 나무 생성 가능 여부 API
    @ApiOperation(value = "해당 위치 추억 나무 생성 가능 여부", notes = "위치 좌표로 검색 \n" +
            "해당 위치에 추억 나무 생성 시 위치 좌표 중심 ?까지 추억 나무 생성 불가")
    @PostMapping("/{memberId}/checkLoc")
    public ResponseEntity<?> checkTreeLocation(@ApiParam(value = "내 memberId", required = true) @PathVariable int memberId, @RequestBody BoardRequestDto.LocationInfo locationInfo){
        try {
            return new ResponseEntity<>(boardService.checkTreeLocation(memberId, locationInfo), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  추억 나무 생성 API
    @ApiOperation(value = "추억 나무 생성", notes = "")
    @PostMapping("")
    public ResponseEntity<?> writeTree(@RequestParam(required = false) List<MultipartFile> fileList, @RequestBody BoardRequestDto.Write writeInfo){
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
    @GetMapping("/{memberId}/{boardId}")
    public ResponseEntity<?> getTree(@ApiParam(value = "내 memberId", required = true) @PathVariable int memberId, @PathVariable int boardId){
        try {
            return new ResponseEntity<>(boardService.getBoardDetailInfo(memberId, boardId), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  샹 Entity 수정해야 함
    //  추억 나무 퍼가기 API
//    @ApiOperation(value = "추억 나무 퍼가기", notes = "boardId에 해당하는 추억 나무 내 숲으로 퍼가기")
//    @PostMapping("/takeTree/{boardId}")
//    public ResponseEntity<?> takeTree(@PathVariable int boardId, @RequestBody BoardRequestDto.LocationInfo locationInfo){
//        try {
//            return new ResponseEntity<>(boardService.takeTreeFromFriend(boardId, locationInfo), HttpStatus.OK);
//        } catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    //  추억 나무 물주기 API
    @ApiOperation(value = "추억 나무 물주기", notes = "태그된 추억 나무에 물주기 \n 오늘 날짜에 해당하는 갱신된 treeLog 하나 반환")
    @GetMapping("/wateringTree/{boardId}")
    public ResponseEntity<?> wateringTree(@ApiParam(value = "추억 나무 boardId", required = true) @PathVariable int boardId){
        try {
            //  바뀐 성장로그만 ... (오늘 날짜만 바뀐걸로 넘겨주기)
            return new ResponseEntity<>(treeLogService.updateScoreByWatering(boardId), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
