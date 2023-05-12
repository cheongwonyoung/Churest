package com.ssafy.churest.dto.resp;

import lombok.Builder;
import lombok.Data;

import java.util.List;

public class ForestResponseDto {

    @Data
    @Builder
    public static class ForestInfo {

        private int avatarId;
        private String birdNickname;
        private int coin;
        private HouseResponseDto.Info house;
        private BirdHouseResponseDto.Info birdhouse;
        private BirdResponseDto.Info bird;
        private List<BoardResponseDto.BoardInfo> treeList;
    }

    @Data
    @Builder
    public static class OtherForestInfo {

        private int memberId;

        private String nickname;

        private int houseId;

        private int treeId;

        public static ForestResponseDto.OtherForestInfo fromEntity(com.ssafy.churest.entity.Member member, com.ssafy.churest.entity.MemberHouse memberHouse){
            return OtherForestInfo.builder()
                    .memberId(member.getMemberId())
                    .nickname(member.getNickname())
                    .houseId(memberHouse.getHouse().getHouseId())
                    .build();
        }
    }
}
