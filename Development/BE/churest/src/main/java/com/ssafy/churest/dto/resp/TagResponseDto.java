package com.ssafy.churest.dto.resp;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

public class TagResponseDto {

    @Data
    @Builder
    public static class TagInfo {
        private int tagId;

        private int boardId;
        private int treeId;

        private String title;

        private LocalDate createdTime;

        private boolean isTaken;


    }
}
