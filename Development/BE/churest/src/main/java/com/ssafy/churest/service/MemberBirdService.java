package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.MemberBirdRequestDto;
import com.ssafy.churest.dto.resp.MemberBirdResponseDto;

import java.util.List;
import java.util.Map;

public interface MemberBirdService {
    Map<String, Object> getBirdList(int memberId);
    List<MemberBirdResponseDto.Info> getMyBirdList(int memberId);
    int availablePurchase(int memberId, int birdId);
    MemberBirdResponseDto.Info purchaseBird(int memberId, int birdId, int change);
    MemberBirdResponseDto.Info updateBirdNickname(int MemberBirdId, String nickname);
    void changeBird(int memberId, int birdId);
    Boolean checkBird(String nickname);
}
