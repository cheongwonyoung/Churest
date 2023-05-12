package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.*;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.entity.MemberBird;
import com.ssafy.churest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private final BoardRepository boardRepository;

    @Override
    public List<ForestResponseDto.OtherForestInfo> getOtherForestList(int memberId) {
        List<ForestResponseDto.OtherForestInfo> res = new ArrayList<>();
        List<Member> memberList = memberRepository.findAll(memberId);
        for(Member m : memberList){
            ForestResponseDto.OtherForestInfo dto = ForestResponseDto.OtherForestInfo.fromEntity(m, memberHouseRepository.findByMember_MemberIdAndIsUsedIsTrue(m.getMemberId()));
            res.add(dto);
        }
        return res;
    }

    @Override
    public ForestResponseDto.ForestInfo getForestInfo(int memberId) {

        Member member = memberRepository.findByMemberId(memberId);

        MemberBird memberBird = memberBirdRepository.findByMember_MemberIdAndIsUsedIsTrue(memberId);

        int treeId = boardRepository.findByMember_MemberId(memberId).get(0).getTree().getTreeId();

        return ForestResponseDto.ForestInfo.builder()
                .avatarId(member.getAvatarId())
                .birdId(memberBird.getBird().getBirdId())
                .birdNickname(memberBird.getNickname())
                .houseId(memberHouseRepository.findByMember_MemberIdAndIsUsedIsTrue(memberId).getHouse().getHouseId())
                .birdhouseId(memberBirdHouseRepository.findByMember_MemberIdAndIsUsedIsTrue(memberId).getBirdHouse().getBirdHouseId())
                .coin(member.getCoin())
                .treeId(treeId)
                .treeList(boardService.getBoardInfoList(memberId))
                .build();
    }
}
