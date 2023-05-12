package com.ssafy.churest.api;

import com.ssafy.churest.dto.req.BoardRequestDto;
import com.ssafy.churest.dto.resp.TagResponseDto;
import com.ssafy.churest.service.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("TagController API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tag")
public class TagController {

    private final TagService tagService;

    @ApiOperation(value = "태그 모아보기", notes = "내가 태그된 추억 나무 조회하기")
    @GetMapping("")
    public ResponseEntity getTagList(@ApiParam(value = "내 memberId", required = true) @RequestParam int memberId){
        try {
            List<TagResponseDto.TagInfo> tagInfoList = tagService.getTagList(memberId);
            if(tagInfoList == null)
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            return new ResponseEntity(tagInfoList, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
