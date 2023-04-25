package com.ssafy.churest.dto.resp;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

public class TagResponseDto {

    @Data
    @Builder
    public static class TagInfo {
        private int tagId;

        private int boardId;

        private String title;

        private LocalDateTime createdTime;

        private boolean isTaken;


    }
}
