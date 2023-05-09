package com.ssafy.churest.dto.req;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class MemberRequestDto {

    @Data
    @NoArgsConstructor
    @ApiModel(value = "회원가입 관련 정보", description = "유저email, 아바타id, member_nickname, bird_id, bird_nickname")
    public static class Join{
        @NotEmpty(message="memberId는 빈값 일 수 없습니다")
        @NotNull(message="memberId는 null 일 수 없습니다")
        private int memberId;
        @NotEmpty(message="avatarId는 빈값 일 수 없습니다")
        @NotNull(message="avatarId는 null 일 수 없습니다")
        private int avatarId;

        @Size(min=1, max=6, message = "바르지 않은 nickname 크기 입니다")
        @NotEmpty(message="nickname은 빈값 일 수 없습니다")
        @NotNull(message="nickname은 null 일 수 없습니다")
        private String nickname;

        @NotEmpty(message="birdId는 빈값 일 수 없습니다")
        @NotNull(message="birdId는 null 일 수 없습니다")
        private int birdId;

        @Size(min=1, max=6, message = "바르지 않은 nickname 크기 입니다")
        @NotEmpty(message="birdNickname은 빈값 일 수 없습니다")
        @NotNull(message="birdNickname은 null 일 수 없습니다")
        private String birdNickname;

    }

}
