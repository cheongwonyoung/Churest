package com.ssafy.churest.dto.resp;

import lombok.Builder;

import java.time.LocalDateTime;

public class TreeLogResponseDto {

    @Builder
    public static class TreeLogInfo{

        private LocalDateTime date;

        private int score;

        public static TreeLogResponseDto.TreeLogInfo fromEntity(com.ssafy.churest.entity.TreeLog treeLog) {
            return TreeLogResponseDto.TreeLogInfo.builder()
                    .date(treeLog.getDate())
                    .score(treeLog.getScore())
                    .build();
        }
    }
}
