package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.SquareResponseDto;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("SquareService")
@RequiredArgsConstructor
public class SquareServiceImpl implements SquareService{

    private final MemberRepository memberRepository;

    @Override
    public SquareResponseDto.DonateInfo getDonateInfo(int memberId) {
        return new SquareResponseDto.DonateInfo(memberRepository.findByMemberId(memberId).getGrownTreeCount(), memberRepository.findAllByMemberIdIsNot(memberId));
    }
}
