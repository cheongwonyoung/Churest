package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.HouseResponseDto;
import com.ssafy.churest.entity.House;
import com.ssafy.churest.entity.MemberBird;
import com.ssafy.churest.entity.MemberHouse;
import com.ssafy.churest.repository.HouseRepository;
import com.ssafy.churest.repository.MemberHouseRepository;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("HouseService")
@RequiredArgsConstructor
public class MemberHouseServiceImpl implements MemberHouseService {
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

    @Override
    public int availablePurchase(int memberId, int houseId) {
        int memberCoin = memberRepository.findById(memberId).get().getCoin();
        int housePrice = houseRepository.findById(houseId).get().getPrice();

        return memberCoin - housePrice;
    }

    @Override
    public Map<String, Object> purchaseHouse(int memberId, int houseId, int change) {
        MemberHouse memberHouse = memberHouseRepository.findByMember_MemberIdAndHouse_HouseId(memberId, houseId);

        if(memberHouse == null){
            memberHouseRepository.save(MemberHouse.builder()
                    .member(memberRepository.findById(memberId).get())
                    .house(houseRepository.findById(houseId).get()).build());
            memberRepository.save(memberRepository.findById(memberId).get().updateCoin(change));
        }

        return getHouseList(memberId);
    }
}