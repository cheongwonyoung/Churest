package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.Bird;
import com.ssafy.churest.entity.House;
import lombok.Builder;
import lombok.Data;

public class HouseResponseDto {

    @Data
    @Builder
    public static class Info{
        private int houseId;
        private String name;
        private String description;
        private int price;
        private Boolean isOwn;
        private Boolean isUsed;
        public static HouseResponseDto.Info fromEntity(House house){
            return Info.builder()
                    .houseId(house.getHouseId())
                    .name(house.getName())
                    .description(house.getDescription())
                    .price(house.getPrice())
                    .build();
        }
    }
}
