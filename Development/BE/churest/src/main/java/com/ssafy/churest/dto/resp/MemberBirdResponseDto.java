package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.Bird;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.entity.MemberBird;
import lombok.Builder;
import lombok.Data;

public class MemberBirdResponseDto {
    @Data
    @Builder
    public static class Info{
        private int memberBirdId;
        private BirdResponseDto.SmallInfo bird;
        private String nickname;
        private Boolean isUsed;
        public static MemberBirdResponseDto.Info fromEntity(MemberBird memberBird){
            return Info.builder()
                    .memberBirdId(memberBird.getMemberBirdId())
                    .bird(BirdResponseDto.SmallInfo.fromEntity(memberBird.getBird()))
                    .nickname(memberBird.getNickname())
                    .isUsed(memberBird.getIsUsed())
                    .build();
        }
    }
}
