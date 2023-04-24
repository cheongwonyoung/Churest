package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.MyPageRequestDto;
import com.ssafy.churest.dto.resp.MemberResponseDto;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("MyPageService")
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{
    private final MemberRepository memberRepository;
    @Override
    public Map<String, Object> getMyPageInfo(int memberId) {
        Map<String, Object> res = new HashMap<>();

        // 회원 정보
        res.put("member", MemberResponseDto.LittleInfo.fromEntity(memberRepository.findById(memberId).get()));

        // 회원의 츄레스트에 있는 글 목록 정보

        return res;
    }

    @Override
    public void updateNickname(MyPageRequestDto.UpdateNickname info) {
        memberRepository.save(memberRepository.findById(info.getMemberId()).get().updateNickname(info.getNickname()));
    }

    @Override
    public void updateAvatar(MyPageRequestDto.UpdateAvatar info) {
        memberRepository.save(memberRepository.findById(info.getMemberId()).get().updateAvatar(info.getAvatarId()));
    }
}
