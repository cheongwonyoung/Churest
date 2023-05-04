package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.MyPageRequestDto;
import com.ssafy.churest.dto.resp.TreeLogResponseDto;
import com.ssafy.churest.dto.resp.TreeResponseDto;

import java.util.List;
import java.util.Map;

public interface MyPageService {
    Map<String, Object> getMyPageInfo(int memberId);

    void updateNickname(MyPageRequestDto.UpdateNickname info);

    void updateAvatar(MyPageRequestDto.UpdateAvatar info);

    int getScore(int boardId);

    TreeResponseDto.TreeInfo getBoardTreeInfo(int boardId);
}
