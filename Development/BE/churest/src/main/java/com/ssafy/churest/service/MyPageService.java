package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.MyPageRequestDto;

public interface MyPageService {
    void updateNickname(MyPageRequestDto.UpdateNickname info);

    void updateAvatar(MyPageRequestDto.UpdateAvatar info);
}
