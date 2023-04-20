package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.BirdHouseResponseDto;
import com.ssafy.churest.dto.resp.HouseResponseDto;
import com.ssafy.churest.entity.BirdHouse;
import com.ssafy.churest.entity.House;
import com.ssafy.churest.entity.MemberBirdHouse;
import com.ssafy.churest.entity.MemberHouse;
import com.ssafy.churest.repository.BirdHouseRepository;
import com.ssafy.churest.repository.MemberBirdHouseRepository;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("MemberHouseService")
@RequiredArgsConstructor
public class MemberBirdHouseServiceImpl implements MemberBirdHouseService{
    private final MemberRepository memberRepository;
    private final BirdHouseRepository birdHouseRepository;
    private final MemberBirdHouseRepository memberBirdHouseRepository;
    @Override
    public Map<String, Object> getBirdHouseList(int memberId) {
        Map<String, Object> res = new HashMap<>();

        res.put("coin", memberRepository.findById(memberId).get().getCoin());

        List<BirdHouseResponseDto.Info> birdHouseRespList = new ArrayList<>();
        List<BirdHouse> birdHouseList = birdHouseRepository.findAll();
        for(BirdHouse b : birdHouseList){
            BirdHouseResponseDto.Info info = BirdHouseResponseDto.Info.fromEntity(b);
            MemberBirdHouse memberBirdHouse = memberBirdHouseRepository.findByMember_MemberIdAndBirdHouse_BirdHouseId(memberId, b.getBirdHouseId());
            if(memberBirdHouse == null){
                info.setIsOwn(false);
                info.setIsUsed(false);
            }else {
                info.setIsOwn(true);
                info.setIsUsed(memberBirdHouse.getIsUsed());
            }
            birdHouseRespList.add(info);
        }
        res.put("birdHouses", birdHouseRespList);

        return res;
    }
}
