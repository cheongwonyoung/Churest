package com.ssafy.churest.dto.req;

import com.ssafy.churest.entity.MemberBird;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class MemberBirdRequestDto {

    @Data
    @NoArgsConstructor
    @ApiModel(value = "새 구매 혹은 바꾸는 정보", description = "유저와 구매하거나 바꾸는 새 정보를 가진 Class")
    public static class PurchaseOrChange {

        @NotEmpty(message="memberId는 빈값 일 수 없습니다")
        @NotNull(message="memberId는 null 일 수 없습니다")
        private int memberId;

        @NotEmpty(message="birdId는 빈값 일 수 없습니다")
        @NotNull(message="birdId는 null 일 수 없습니다")
        private int birdId;
    }

    @Data
    @NoArgsConstructor
    @ApiModel(value = "새 닉네임 정보", description = "구매자, 구매하는 새 정보를 가진 Class")
    public static class UpdateNickname{

        @NotEmpty(message="memberBirdId는 빈값 일 수 없습니다")
        @NotNull(message="memberBirdId는 null 일 수 없습니다")
        private int memberBirdId;
        @Size(min=1, max=6, message = "바르지 않은 nickname 크기 입니다")
        @NotEmpty(message="nickname은 빈값 일 수 없습니다")
        @NotNull(message="nickname은 null 일 수 없습니다")
        private String nickname;
    }

    @Data
    @NoArgsConstructor
    public static class Info{

        private int memberId;

        private int birdId;

        private String nickname;

        private Boolean isUsed;

    }


}
