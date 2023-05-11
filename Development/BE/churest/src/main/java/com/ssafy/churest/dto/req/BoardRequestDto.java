package com.ssafy.churest.dto.req;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


public class BoardRequestDto {

    @Getter
    //  나의 숲에서 나무 위치
    public static class LocationInfo {

        //  0 ~ 224로 이루어진 나무 좌표
        private int spot;
    }

    @Data
    @NoArgsConstructor
    //  추억 나무 작성
//    @ApiModel(value = "추억 나무 작성 정보", description = "추억 나무 작성 및 생성자 정보")
    public static class Write {

        private int memberId;
        private int treeId;
        private String title;

        private String content;

        private String weather;

        private String date;

        //  0 ~ 224로 이루어진 나무 좌표
        private int spot;

        //  태그된 사용자 id
        private List<Integer> tagList;

//        만약 나무를 사용자가 선택할 수 있다면
//        private int treeId;

    }
}
