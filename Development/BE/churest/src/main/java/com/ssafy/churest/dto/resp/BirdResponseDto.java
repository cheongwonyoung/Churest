package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.Bird;
import io.swagger.models.auth.In;
import lombok.Builder;
import lombok.Data;

public class BirdResponseDto {

    @Data
    @Builder
    public static class Info{
        private int birdId;
        private String name;
        private String description;
        private int price;
        private Boolean isOwn;
        private Boolean isUsed;
        public static Info fromEntity(Bird bird){
            return Info.builder()
                    .birdId(bird.getBirdId())
                    .name(bird.getName())
                    .description(bird.getDescription())
                    .price(bird.getPrice())
                    .build();
        }
    }

    @Data
    @Builder
    public static class SmallInfo {
        private int birdId;
        private String name;
        private String description;

        public static SmallInfo fromEntity(Bird bird){
            return SmallInfo.builder()
                    .birdId(bird.getBirdId())
                    .name(bird.getName())
                    .description(bird.getDescription())
                    .build();
        }
    }
}
