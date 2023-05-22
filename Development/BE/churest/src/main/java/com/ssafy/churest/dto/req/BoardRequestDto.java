package com.ssafy.churest.dto.req;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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
    @ApiModel(value = "글 작성 정보", description = "작성자 id, 트리 id, 제목, 글, 날씨, 날짜, 좌표, 태그들을 가진 Class")
    //  추억 나무 작성
//    @ApiModel(value = "추억 나무 작성 정보", description = "추억 나무 작성 및 생성자 정보")
    public static class Write {

        @NotEmpty(message="MemberId 빈값 일 수 없습니다")
        @NotNull(message="MemberId null 일 수 없습니다")
        private int memberId;
        @NotEmpty(message="treeId 빈값 일 수 없습니다")
        @NotNull(message="treeId null 일 수 없습니다")
        private int treeId;
        @NotEmpty(message="title 빈값 일 수 없습니다")
        @NotNull(message="title null 일 수 없습니다")
        private String title;

        @NotEmpty(message="content 빈값 일 수 없습니다")
        @NotNull(message="content null 일 수 없습니다")
        private String content;

        @NotEmpty(message="weather 빈값 일 수 없습니다")
        @NotNull(message="weather null 일 수 없습니다")
        private String weather;

        @NotEmpty(message="date 빈값 일 수 없습니다")
        @NotNull(message="date null 일 수 없습니다")
        private String date;

        //  0 ~ 224로 이루어진 나무 좌표
        @NotEmpty(message="spot 빈값 일 수 없습니다")
        @NotNull(message="spot null 일 수 없습니다")
        private int spot;

        //  태그된 사용자 id
        @NotEmpty(message="tagList 빈값 일 수 없습니다")
        @NotNull(message="tagList null 일 수 없습니다")
        private List<Integer> tagList;


    }
}
