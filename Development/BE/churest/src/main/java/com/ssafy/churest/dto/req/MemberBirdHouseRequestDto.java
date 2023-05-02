package com.ssafy.churest.dto.req;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class MemberBirdHouseRequestDto {
    @Data
    @NoArgsConstructor
    @ApiModel(value = "새집 구매 혹은 바꾸는 정보", description = "사용자, 구매하거나 바꾸는 새집 Id를 가진 Class")
    public static class PurchaseOrChange {

        @NotEmpty(message="memberId는 빈값 일 수 없습니다")
        @NotNull(message="memberId는 null 일 수 없습니다")
        private int memberId;

        @NotEmpty(message="birdHouseId는 빈값 일 수 없습니다")
        @NotNull(message="birdHouseId는 null 일 수 없습니다")
        private int birdHouseId;
    }
}
