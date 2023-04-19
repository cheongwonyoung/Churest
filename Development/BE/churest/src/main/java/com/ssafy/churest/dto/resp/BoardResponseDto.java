package com.ssafy.churest.dto.resp;

import java.time.LocalDateTime;
import java.util.List;

public class BoardResponseDto {

    public static class BoardInfo {

        private int locationX;

        private int locationY;

        private int score;

    }

    public static class BoardDetailInfo {

        private String title;

        private String content;

        private LocalDateTime createdTime;

        private String weather;

        private int locationX;

        private int locationY;

        private List<String> fileList;

        //  태그된 사용자 id
        private List<Integer> tagList;

        //  나무 종류
        private TreeInfo treeInfo;

        //  나무 성장 로그
        private List<TreeLogInfo> treeLogInfoList;
    }

    //  따로 빼?
    public static class TreeInfo{

        private String name;

        private String description;

        private String file;
    }

    public static class TreeLogInfo{

        private LocalDateTime date;

        private int score;
    }
}
