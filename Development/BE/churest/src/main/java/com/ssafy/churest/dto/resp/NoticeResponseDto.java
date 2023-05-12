package com.ssafy.churest.dto.resp;
import com.ssafy.churest.entity.Notice;
import lombok.Data;
import lombok.Builder;

import java.time.LocalDateTime;

public class NoticeResponseDto {
    @Data
    @Builder
    public static class tagInfo{
        private int noticeId;
        private int fromMember;
        private int toMember;
        private int board;
        private int avatar;
        private String content;
        private Boolean isChecked;
        private LocalDateTime createdTime;
        private String fromMemberName;

        public static NoticeResponseDto.tagInfo fromEntity(Notice notice){
            return tagInfo.builder()
                    .board(notice.getBoard().getBoardId())
                    .avatar(notice.getFromMember().getAvatarId())
                    .noticeId(notice.getNoticeId())
                    .fromMember(notice.getFromMember().getMemberId())
                    .toMember(notice.getToMember().getMemberId())
                    .content(notice.getContent())
                    .isChecked(notice.getIsChecked())
                    .createdTime(notice.getDate())
                    .fromMemberName(notice.getFromMember().getNickname())
                    .build();
        }
    }

}