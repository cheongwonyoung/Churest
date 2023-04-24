package com.ssafy.churest.dto.req;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


public class BoardRequestDto {

    //  ForestRequestDto로 뺄까?

    @Getter
    //  나의 숲에서 나무 위치
    public static class LocationInfo {
        private int locationX;
        private int locationY;
    }

    @Data
    @NoArgsConstructor
    //  추억 나무 작성
//    @ApiModel(value = "추억 나무 작성 정보", description = "추억 나무 작성 및 생성자 정보")
    public static class Write {

        private int memberId;

        private String title;

        private String content;

        private String weather;

        private int locationX;

        private int locationY;

        //  태그된 사용자 id
        private List<Integer> tagList;

    }
}
