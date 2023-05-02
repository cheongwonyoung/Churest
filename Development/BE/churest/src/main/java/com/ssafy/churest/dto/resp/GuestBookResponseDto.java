package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.GuestBook;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

public class GuestBookResponseDto {

    @Data
    @Builder
    public static class Info{
        private int guestBookId;
        private MemberResponseDto.LittleInfo fromMember;
        private String content;
        private LocalDateTime createdTime;

        public static GuestBookResponseDto.Info fromEntity(GuestBook guestBook){
            return Info.builder()
                    .guestBookId(guestBook.getGuestBookId())
                    .fromMember(MemberResponseDto.LittleInfo.fromEntity(guestBook.getFromMember()))
                    .content(guestBook.getContent())
                    .createdTime(guestBook.getCreatedTime()).build();
        }
    }
}
