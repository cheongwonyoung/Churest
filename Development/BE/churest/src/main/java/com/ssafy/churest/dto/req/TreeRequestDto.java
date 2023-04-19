package com.ssafy.churest.dto.req;

import com.ssafy.churest.entity.Tag;

import java.util.List;

public class TreeRequestDto {

    //  추억 나무 작성
//    @ApiModel(value = "추억 나무 작성 정보", description = "추억 나무 작성 및 생성자 정보")
    public static class Write {

        private String title;

        private String content;

        private String weather;

        private int locationX;

        private int locationY;

        //  사진 목록
        private List<String> fileList;

        //  태그된 사용자 id
        private List<Integer> tagList;

    }
}
