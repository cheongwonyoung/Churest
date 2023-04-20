package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.HouseResponseDto;
import com.ssafy.churest.entity.House;
import com.ssafy.churest.entity.MemberHouse;
import com.ssafy.churest.repository.HouseRepository;
import com.ssafy.churest.repository.MemberHouseRepository;
import com.ssafy.churest.repository.MemberRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("HouseService")
@RequiredArgsConstructor
public class HouseServiceImpl implements HouseService{
    private final MemberRepository memberRepository;
    private final HouseRepository houseRepository;
    private final MemberHouseRepository memberHouseRepository;
    @Override
    public Map<String, Object> getHouseList(int memberId) {
        Map<String, Object> res = new HashMap<>();

        res.put("coin", memberRepository.findById(memberId).get().getCoin());

        List<HouseResponseDto.Info> houseRespList = new ArrayList<>();
        List<House> houseList = houseRepository.findAll();
        for(House h : houseList){
            HouseResponseDto.Info info = HouseResponseDto.Info.fromEntity(h);
            MemberHouse memberHouse = memberHouseRepository.findByMember_MemberIdAndHouse_HouseId(memberId, h.getHouseId());
            if(memberHouse == null){
                info.setIsOwn(false);
                info.setIsUsed(false);
            }else {
                info.setIsOwn(true);
                info.setIsUsed(memberHouse.getIsUsed());
            }
            houseRespList.add(info);
        }
        res.put("houses", houseRespList);
        return res;
    }
}
