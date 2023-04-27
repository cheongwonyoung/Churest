package com.ssafy.churest.dto.resp;
import com.ssafy.churest.entity.Member;

import lombok.Builder;
import lombok.Data;

public class MemberResponseDto {

    @Data
    @Builder
    public static class FriendSearchInfo {
        private int memberId;
        private int avatarId;
        private String nickname;

        public static FriendSearchInfo fromEntity(com.ssafy.churest.entity.Member member) {
            return FriendSearchInfo.builder()
                    .memberId(member.getMemberId())
                    .avatarId(member.getAvatarId())
                    .nickname(member.getNickname())
                    .build();
        }
    }


    @Data
    @Builder
    public static class LittleInfo {
        private int memberId;
        private String nickname;
        private int avatarId;
        public static LittleInfo fromEntity(Member member) {
            return LittleInfo.builder()
                    .memberId(member.getMemberId())
                    .nickname(member.getNickname())
                    .avatarId(member.getAvatarId())
                    .build();
        }
    }

    @Data
    @Builder
    public static class MemberInfo{
        private int memberId;
        private int avatarId;
        private int coin;
        private String email;
        private String nickname;
        private String token;
        public static MemberInfo fromEntity(Member member) {
            return MemberInfo.builder()
                    .memberId(member.getMemberId())
                    .avatarId(member.getAvatarId())
                    .coin(member.getCoin())
                    .email(member.getEmail())
                    .nickname(member.getNickname())
                    .token(member.getToken())
                    .avatarId(member.getAvatarId())
                    .build();
        }
    }
}
