package com.ssafy.churest.dto.resp;

import java.util.List;

public class ForestResponseDto {

    public static class ForestInfo {

        private int avatarId;

        private int birdId;

        private int houseId;

        private int birdHouseId;

        private List<BoardResponseDto.BoardInfo> treeList;

        private int coin;
    }
}
