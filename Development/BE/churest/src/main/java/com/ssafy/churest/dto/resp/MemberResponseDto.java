package com.ssafy.churest.dto.resp;
import com.ssafy.churest.entity.Member;

import lombok.Builder;
import lombok.Data;

public class MemberResponseDto {

    @Builder
    public static class FriendSearchInfo {
        private int memberId;
        private int avatarId;
        private String nickname;

        private String file;

        public static FriendSearchInfo fromEntity(com.ssafy.churest.entity.Member member) {
            return FriendSearchInfo.builder()
                    .memberId(member.getMemberId())
                    .avatarId(member.getAvatarId())
                    .nickname(member.getNickname())
                    .file(member.getFile())
                    .build();
        }
    }


    @Data
    @Builder
    public static class LittleInfo {
        private int memberId;
        private String nickname;
        private String file;
        public static LittleInfo fromEntity(Member member) {
            return LittleInfo.builder()
                    .memberId(member.getMemberId())
                    .nickname(member.getNickname())
                    .file(member.getFile())
                    .build();
        }


    }


}

