package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.Board;
import com.ssafy.churest.repository.BoardRepository;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

public class BoardResponseDto {

    @Builder
    public static class BoardInfo {

        private int boardId;

        private int locationX;

        private int locationY;

        private int score;

        public static BoardInfo fromEntity(com.ssafy.churest.entity.MemberBoard memberBoard, com.ssafy.churest.entity.Board board, com.ssafy.churest.entity.TreeLog treeLog) {
            return BoardInfo.builder()
                    .boardId(board.getBoardId())
                    .locationX(memberBoard.getLocationX())
                    .locationY(memberBoard.getLocationY())
                    .score(treeLog.getScore())
                    .build();
        }

    }

    @Data
    @Builder
    public static class BoardDetailInfo {

        private String title;

        private String content;

        private LocalDateTime createdTime;

        private String weather;

//        private int locationX;
//
//        private int locationY;

        //  추억 나무를 조회하는 사용자의 물주기 권한 여부
        private boolean isTagged;

        private List<String> fileList;

        //  태그된 사용자 id
        private List<Integer> tagList;

        //  나무 종류
        private TreeResponseDto.TreeInfo treeInfo;

        //  나무 성장 로그
        private List<TreeLogResponseDto.TreeLogInfo> treeLogInfoList;

        public static BoardDetailInfo fromEntity(com.ssafy.churest.entity.Board board) {
            return BoardDetailInfo.builder()
                    .title(board.getTitle())
                    .content(board.getContent())
                    .createdTime(board.getCreatedTime())
                    .weather(board.getWeather())
//                    .locationX(memberBoard.getLocationX())
//                    .locationY(memberBoard.getLocationY())
                    .build();
        }
    }

    @Data
    @Builder
    public static class MyPageInfo {
        private int boardId;
        private String title;
        private LocalDateTime createdTime;
        private int score;

        public static MyPageInfo fromEntity(Board board) {
            return MyPageInfo.builder().boardId(board.getBoardId())
                    .title(board.getTitle())
                    .createdTime(board.getCreatedTime()).build();
        }
    }
}
