package com.ssafy.churest.repository;

import com.ssafy.churest.entity.MemberBirdHouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberBirdHouseRepository extends JpaRepository<MemberBirdHouse, Integer> {
    MemberBirdHouse findByMember_MemberIdAndIsUsedIsTrue(int memberId);
}
