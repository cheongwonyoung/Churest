package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.NoticeResponseDto;

import java.util.List;

public interface NoticeService {
    List<NoticeResponseDto.tagInfo> saerch(int memberId);

    void check(int noticeId);
}
