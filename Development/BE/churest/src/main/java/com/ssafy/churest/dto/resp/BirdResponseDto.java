package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.Bird;
import lombok.Builder;
import lombok.Data;

public class BirdResponseDto {

    @Data
    public static class Info{
        private int birdId;
        private String name;
        private String description;
        private int price;
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
