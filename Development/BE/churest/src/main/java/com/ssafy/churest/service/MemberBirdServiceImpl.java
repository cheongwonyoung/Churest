package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.MemberBirdRequestDto;
import com.ssafy.churest.dto.resp.BirdResponseDto;
import com.ssafy.churest.dto.resp.MemberBirdResponseDto;
import com.ssafy.churest.entity.Bird;
import com.ssafy.churest.entity.MemberBird;
import com.ssafy.churest.repository.BirdRepository;
import com.ssafy.churest.repository.MemberBirdRepository;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("MemberBirdService")
@RequiredArgsConstructor
public class MemberBirdServiceImpl implements MemberBirdService{

    private final MemberRepository memberRepository;
    private final BirdRepository birdRepository;
    private final MemberBirdRepository memberBirdRepository;

    @Override
    public Map<String, Object> getBirdList(int memberId) {
        Map<String, Object> res = new HashMap<>();

        // 멤버의 보유 코인
        res.put("coin", memberRepository.findById(memberId).get().getCoin());

        // 새 리스트
        List<BirdResponseDto.Info> birdRespList = new ArrayList<>();
        List<Bird> birdList = birdRepository.findAll();
        for(Bird bird : birdList){
            BirdResponseDto.Info info = BirdResponseDto.Info.fromEntity(bird);

            MemberBird memberBird = memberBirdRepository.findByMember_MemberIdAndBird_BirdId(memberId, bird.getBirdId());
            // 보유하지 않은 새
            if(memberBird == null){
                info.setIsOwn(false);
                info.setIsUsed(false);
            }
            // 보유한 새
            else{
                info.setIsOwn(true);
                // 보유한 새의 사용 여부
                info.setIsUsed(memberBird.getIsUsed());
            }
            birdRespList.add(info);
        }

        res.put("birds", birdRespList);

        return res;
    }

    @Override
    public List<MemberBirdResponseDto.Info> getMyBirdList(int memberId) {
        List<MemberBirdResponseDto.Info> res = new ArrayList<>();
        List<MemberBird> memberBirdList = memberBirdRepository.findAllByMember_MemberIdOrderByCreatedTimeDesc(memberId);
        for(MemberBird m : memberBirdList){
            MemberBirdResponseDto.Info info = MemberBirdResponseDto.Info.fromEntity(m);
            res.add(info);
        }
        return res;
    }

    @Override
    public int availablePurchase(int memberId, int birdId) {
        int memberCoin = memberRepository.findById(memberId).get().getCoin();
        int birdPrice = birdRepository.findById(birdId).get().getPrice();

        return memberCoin - birdPrice;
    }

    @Override
    public MemberBirdResponseDto.Info purchaseBird(int memberId, int birdId, int change) {
        MemberBird memberBird = memberBirdRepository.findByMember_MemberIdAndBird_BirdId(memberId, birdId);
        if(memberBird == null){
            memberBirdRepository.save(MemberBird.builder()
                    .member(memberRepository.findById(memberId).get())
                    .bird(birdRepository.findById(birdId).get()).build());
            memberRepository.save(memberRepository.findById(memberId).get().updateCoin(change));
        }
        MemberBirdResponseDto.Info res = MemberBirdResponseDto.Info.fromEntity(memberBirdRepository.findByMember_MemberIdAndBird_BirdId(memberId, birdId));
        return res;
    }

    @Override
    public MemberBirdResponseDto.Info updateBirdNickname(int memberBirdId, String nickname) {
        memberBirdRepository.save(memberBirdRepository.findById(memberBirdId).get().updateNickname(nickname));
        MemberBirdResponseDto.Info res = MemberBirdResponseDto.Info.fromEntity(memberBirdRepository.findById(memberBirdId).get());
        return res;
    }

    @Override
    public void changeBird(int memberId, int birdId) {
        memberBirdRepository.save(memberBirdRepository.findByMember_MemberIdAndIsUsedIsTrue(memberId).updateIsUsed(false));
        memberBirdRepository.save(memberBirdRepository.findByMember_MemberIdAndBird_BirdId(memberId, birdId).updateIsUsed(true));
    }
    @Override
    public Boolean checkBird(String nickname) {
        // member_bird 테이블의 nickname에서 확인
        return memberBirdRepository.existsByNickname(nickname);
    }
}
