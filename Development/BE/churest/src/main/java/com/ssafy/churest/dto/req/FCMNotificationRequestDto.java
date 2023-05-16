package com.ssafy.churest.dto.req;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FCMNotificationRequestDto {

    private int fromUserId;
    private int targetUserId;
    private int noticeId;
    private String title;


    @Builder
    public FCMNotificationRequestDto(int fromUserId, int targetUserId, int noticeId, String title){
        this.fromUserId = fromUserId;
        this.targetUserId = targetUserId;
        this.noticeId = noticeId;
        this.title = title;
    }

}
