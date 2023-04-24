package com.ssafy.churest.dto.resp;

import lombok.Builder;

public class TreeResponseDto {

    @Builder
    public static class TreeInfo{

        private String name;

        private String description;

        private String file;

        public static TreeInfo fromEntity(com.ssafy.churest.entity.Tree tree) {
            return TreeInfo.builder()
                    .name(tree.getName())
                    .description(tree.getDescription())
                    .file(tree.getFile())
                    .build();
        }
    }
}
