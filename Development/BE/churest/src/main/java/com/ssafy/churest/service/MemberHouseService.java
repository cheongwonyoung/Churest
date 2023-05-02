package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.HouseResponseDto;

import java.util.List;
import java.util.Map;

public interface MemberHouseService {
    Map<String, Object> getHouseList(int memberId);

    int availablePurchase(int memberId, int houseId);

    Map<String, Object> purchaseHouse(int memberId, int houseId, int change);

    void changeHouse(int memberId, int houseId);
}
