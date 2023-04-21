package com.ssafy.churest.dto.req;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class GuestBookRequestDto {
    @Data
    @NoArgsConstructor
    @ApiModel(value = "방명록 작성 정보", description = "발신자, 수신자, 방명록 내용을 가진 Class")
    public static class Write{
        @NotEmpty(message="toMemberId 빈값 일 수 없습니다")
        @NotNull(message="toMemberId null 일 수 없습니다")
        private int toMemberId;
        @NotEmpty(message="fromMemberId 빈값 일 수 없습니다")
        @NotNull(message="fromMemberId null 일 수 없습니다")
        private int fromMemberId;
        @Size(min=1, max=140, message = "바르지 않은 content 크기 입니다")
        @NotEmpty(message="content 빈값 일 수 없습니다")
        @NotNull(message="content null 일 수 없습니다")
        private String content;
    }

    @Data
    @NoArgsConstructor
    @ApiModel(value = "방명록 수정 정보", description = "방명록 Id, 방명록 내용을 가진 Class")
    public static class Modify{
        @NotEmpty(message="GuestBookId 빈값 일 수 없습니다")
        @NotNull(message="GuestBookId null 일 수 없습니다")
        private int GuestBookId;

        @NotEmpty(message="fromMemberId 빈값 일 수 없습니다")
        @NotNull(message="fromMemberId null 일 수 없습니다")
        private int fromMemberId;
        @Size(min=1, max=140, message = "바르지 않은 content 크기 입니다")
        @NotEmpty(message="content 빈값 일 수 없습니다")
        @NotNull(message="content null 일 수 없습니다")
        private String content;
    }

    @Data
    @NoArgsConstructor
    @ApiModel(value = "방명록 삭제 정보", description = "방명록 Id, 작성자 Id, 방명록 내용을 가진 Class")
    public static class Delete{
        @NotEmpty(message="GuestBookId 빈값 일 수 없습니다")
        @NotNull(message="GuestBookId null 일 수 없습니다")
        private int GuestBookId;

        @NotEmpty(message="fromMemberId 빈값 일 수 없습니다")
        @NotNull(message="fromMemberId null 일 수 없습니다")
        private int fromMemberId;
    }
}
