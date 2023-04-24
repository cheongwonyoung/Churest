package com.ssafy.churest.dto.resp;

import lombok.Builder;

import java.time.LocalDate;

public class TreeLogResponseDto {

    @Builder
    public static class TreeLogInfo{

        private int treeLogId;

        private LocalDate date;

        private int score;

        public static TreeLogResponseDto.TreeLogInfo fromEntity(com.ssafy.churest.entity.TreeLog treeLog) {
            return TreeLogResponseDto.TreeLogInfo.builder()
                    .treeLogId(treeLog.getTreeLogId())
                    .date(treeLog.getDate())
                    .score(treeLog.getScore())
                    .build();
        }
    }
}
