package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.Board;
import com.ssafy.churest.repository.BoardRepository;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

public class BoardResponseDto {

    @Data
    @Builder
    public static class BoardInfo {

        private int boardId;

        //  0 ~ 224로 이루어진 나무 좌표
        private int spot;

        private int score;

        public static BoardInfo fromEntity(com.ssafy.churest.entity.MemberBoard memberBoard, com.ssafy.churest.entity.Board board, com.ssafy.churest.entity.TreeLog treeLog) {
            return BoardInfo.builder()
                    .boardId(board.getBoardId())
                    .spot(memberBoard.getSpot())
                    .score(treeLog.getScore())
                    .build();
        }

    }

    @Data
    @Builder
    public static class BoardDetailInfo {

        private String title;

        private String content;

        private LocalDate createdTime;

        private String weather;

        //  추억 나무를 조회하는 사용자의 물주기 권한 여부
        private boolean isTagged;

        //  나무로 성장하여 처음으로 포인트 지급 받게 되는 경우
        private boolean isReward;

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
                    .build();
        }
    }

    @Data
    @Builder
    public static class MyPageInfo {
        private int boardId;
        private String title;
        private LocalDate createdTime;
        private int score;
        private TreeResponseDto.TreeInfo treeInfo;

        public static MyPageInfo fromEntity(Board board) {
            return MyPageInfo.builder().boardId(board.getBoardId())
                    .title(board.getTitle())
                    .createdTime(board.getCreatedTime()).build();
        }
    }
}
