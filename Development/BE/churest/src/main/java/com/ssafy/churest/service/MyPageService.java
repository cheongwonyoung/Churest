package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.MyPageRequestDto;

import java.util.Map;

public interface MyPageService {
    Map<String, Object> getMyPageInfo(int memberId);

    void updateNickname(MyPageRequestDto.UpdateNickname info);

    void updateAvatar(MyPageRequestDto.UpdateAvatar info);
}
