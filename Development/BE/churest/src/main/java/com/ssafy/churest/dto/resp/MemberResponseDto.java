package com.ssafy.churest.dto.resp;

import lombok.Builder;

public class MemberResponseDto {

    @Builder
    public static class FriendSearchInfo {
        private int memberId;
        private int avatarId;
        private String nickname;

        private String file;

        public static FriendSearchInfo fromEntity(com.ssafy.churest.entity.Member member){
            return FriendSearchInfo.builder()
                    .memberId(member.getMemberId())
                    .avatarId(member.getAvatarId())
                    .nickname(member.getNickname())
                    .file(member.getFile())
                    .build();
        }

    }

}
