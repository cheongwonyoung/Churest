package com.ssafy.churest.dto.req;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FCMNotificationRequestDto {

    private int fromUserId;
    private int targetUserId;
    private String title;


    @Builder
    public FCMNotificationRequestDto(int fromUserId, int targetUserId, String title, String body){
        this.fromUserId = fromUserId;
        this.targetUserId = targetUserId;
        this.title = title;
    }

}
