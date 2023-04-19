package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.BoardRequestDto;
import com.ssafy.churest.service.BoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

//@Slf4j
@Api("ForestController API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/forest")
public class ForestController {

//    private final ForestService forestService;
//    private final TreeService treeService;
    private final BoardService boardService;


//    public ForestController(TreeService treeService) {
//        this.treeService = treeService;
//    }

    //  숲 정보 API // 나 또는 친구 숲
    @GetMapping("/{memberId}")
    public static ResponseEntity<?> getForest(@PathVariable int memberId){
        try{

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //  추억 나무 생성 시 닉네임 조회 API
//    @GetMapping("/{nickname}")
//    public static ResponseEntity<?> searchFriend(@PathVariable String nickname){
//        try{
//
//        }catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    //  해당 위치 추억 나무 생성 가능 여부 API
    @ApiOperation(value = "해당 위치 추억 나무 생성 가능 여부", notes = "위치 좌표로 검색 \n" +
            "해당 위치에 추억 나무 생성 시 위치 좌표 중심 ?까지 추억 나무 생성 불가")
    @PostMapping("")
    public ResponseEntity<?> checkTreeLocation(@RequestBody BoardRequestDto.LocationInfo locationInfo){
        try{
            return new ResponseEntity<>(boardService.checkTreeLocation(locationInfo), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  추억 나무 생성 API
    @ApiOperation(value = "추억 나무 생성", notes = "")
    public ResponseEntity<?> writeTree(List<MultipartFile> fileList, @RequestBody BoardRequestDto.Write writeInfo){
        try{
            boardService.writeTree(fileList, writeInfo);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  추억 나무 조회 API

}
