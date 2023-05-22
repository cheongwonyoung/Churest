package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.Board;
import com.ssafy.churest.entity.Member;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

public class TagResponseDto {

    @Data
    @Builder
    public static class TagInfo {
        private int tagId;

        private int boardId;
        private int treeId;

        private String title;

        private LocalDate createdTime;

        private boolean isTaken;


    }
    @Data
    @Builder
    public static class Tag {
        private int memberId;

        private int avatarId;

        private String nickname;

        public static TagResponseDto.Tag fromEntity(Member member) {
            return Tag.builder().memberId(member.getMemberId())
                    .avatarId(member.getAvatarId())
                    .nickname(member.getNickname()).build();
        }

    }
}
