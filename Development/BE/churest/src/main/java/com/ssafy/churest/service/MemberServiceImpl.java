package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.MemberResponseDto;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service("MemberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;


    @Override
    public List<MemberResponseDto.FriendSearchInfo> getSearchMemberList(String nickname, int memberId) {
        return memberRepository.findAllByNicknameContainingAndMemberIdIsNot(nickname, memberId).stream().map(MemberResponseDto.FriendSearchInfo::fromEntity).collect(Collectors.toList());
    }
}
