package com.ssafy.churest.service;

import java.util.Map;

public interface MemberBirdHouseService {
    Map<String, Object> getBirdHouseList(int memberId);

    int availablePurchase(int memberId, int birdHouseId);

    Map<String, Object> purchaseBirdHouse(int memberId, int birdHouseId, int change);
}
