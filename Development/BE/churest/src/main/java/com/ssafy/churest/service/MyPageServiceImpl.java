package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.MyPageRequestDto;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("MyPageService")
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{
    private final MemberRepository memberRepository;
    @Override
    public void updateNickname(MyPageRequestDto.UpdateNickname info) {
        memberRepository.save(memberRepository.findById(info.getMemberId()).get().updateNickname(info.getNickname()));
    }

    @Override
    public void updateAvatar(MyPageRequestDto.UpdateAvatar info) {
        memberRepository.save(memberRepository.findById(info.getMemberId()).get().updateAvatar(info.getAvatarId()));
    }
}
