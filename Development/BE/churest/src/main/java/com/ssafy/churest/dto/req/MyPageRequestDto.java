package com.ssafy.churest.dto.req;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class MyPageRequestDto {

    @Data
    @NoArgsConstructor
    @ApiModel(value = "회원 업데이트 닉네임 정보", description = "회원 Id, 회원 닉네임 정보를 가진 Class")
    public static class UpdateNickname{

        @NotEmpty(message="memberId 빈값 일 수 없습니다")
        @NotNull(message="memberId null 일 수 없습니다")
        private int memberId;
        @Size(min=1, max=6, message = "바르지 않은 nickname 크기 입니다")
        @NotEmpty(message="nickname은 빈값 일 수 없습니다")
        @NotNull(message="nickname은 null 일 수 없습니다")
        private String nickname;
    }

    @Data
    @NoArgsConstructor
    @ApiModel(value = "회원 업데이트 아바타 정보", description = "회원 Id, 아바타Id 정보를 가진 Class")
    public static class UpdateAvatar{

        @NotEmpty(message="memberId 빈값 일 수 없습니다")
        @NotNull(message="memberId null 일 수 없습니다")
        private int memberId;
        @NotEmpty(message="avatarId 빈값 일 수 없습니다")
        @NotNull(message="avatarId null 일 수 없습니다")
        private int avatarId;
    }
}
