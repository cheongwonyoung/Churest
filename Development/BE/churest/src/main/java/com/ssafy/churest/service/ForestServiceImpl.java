package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.ForestResponseDto;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.entity.MemberBird;
import com.ssafy.churest.repository.MemberBirdHouseRepository;
import com.ssafy.churest.repository.MemberBirdRepository;
import com.ssafy.churest.repository.MemberHouseRepository;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service("ForestService")
@RequiredArgsConstructor
public class ForestServiceImpl implements ForestService{

    private final BoardService boardService;

    private final MemberRepository memberRepository;
    private final MemberBirdRepository memberBirdRepository;
    private final MemberBirdHouseRepository memberBirdHouseRepository;
    private final MemberHouseRepository memberHouseRepository;

    @Override
    public List<ForestResponseDto.OtherForestInfo> getOtherForestList(int memberId) {

        return memberRepository.findAll(memberId).stream().map(member -> ForestResponseDto.OtherForestInfo.fromEntity(member, memberHouseRepository.findByMember_MemberIdAndIsUsedIsTrue(member.getMemberId()))).collect(Collectors.toList());
    }

    @Override
    public ForestResponseDto.ForestInfo getForestInfo(int memberId) {

        Member member = memberRepository.findByMemberId(memberId);

        MemberBird memberBird = memberBirdRepository.findByMember_MemberIdAndIsUsedIsTrue(memberId);

        return ForestResponseDto.ForestInfo.builder()
                .avatarId(member.getAvatarId())
                .birdId(memberBird.getMemberBirdId())
                .birdNickname(memberBird.getNickname())
                .houseId(memberHouseRepository.findByMember_MemberIdAndIsUsedIsTrue(memberId).getMemberHouseId())
                .birdHouseId(memberBirdHouseRepository.findByMember_MemberIdAndIsUsedIsTrue(memberId).getMemberBirdHouseId())
                .coin(member.getCoin())
                .treeList(boardService.getBoardInfoList(memberId))
                .build();
    }
}
