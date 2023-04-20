package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.MemberResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MemberService {
    List<MemberResponseDto.FriendSearchInfo> getSearchMemberList(String nickname, int memberId);
}
