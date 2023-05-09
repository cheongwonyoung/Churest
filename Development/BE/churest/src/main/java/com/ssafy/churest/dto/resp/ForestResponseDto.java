package com.ssafy.churest.dto.resp;

import lombok.Builder;
import lombok.Data;

import java.util.List;

public class ForestResponseDto {

    @Data
    @Builder
    public static class ForestInfo {

        private int avatarId;

        private int birdId;

        private String birdNickname;

        private int houseId;

        private int birdHouseId;

        private int coin;

        private List<BoardResponseDto.BoardInfo> treeList;
    }

    @Data
    @Builder
    public static class OtherForestInfo {

        private int memberId;

        private String nickname;

        private int houseId;

        public static ForestResponseDto.OtherForestInfo fromEntity(com.ssafy.churest.entity.Member member, com.ssafy.churest.entity.MemberHouse memberHouse){
            return OtherForestInfo.builder()
                    .memberId(member.getMemberId())
                    .nickname(member.getNickname())
                    .houseId(memberHouse.getHouse().getHouseId())
                    .build();
        }
    }
}
