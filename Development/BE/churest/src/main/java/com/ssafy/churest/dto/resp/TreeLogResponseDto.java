package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.TreeLog;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

public class TreeLogResponseDto {


    @Data
    @Builder
    public static class TreeLogInfo {

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

    @Data
    @Builder
    public static class RecentTreeLogInfo {

        //  나무로 성장해서 방금 포인트 받은 상태
        private boolean isReward;

        private TreeLogInfo treeLogInfo;

        public static TreeLogResponseDto.RecentTreeLogInfo fromEntity(TreeLogInfo treeLogInfo, boolean isReward){
            return TreeLogResponseDto.RecentTreeLogInfo.builder().treeLogInfo(treeLogInfo).isReward(isReward).build();
        }
    }
}
