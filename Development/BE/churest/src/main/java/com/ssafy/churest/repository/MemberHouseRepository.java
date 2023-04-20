package com.ssafy.churest.repository;

import com.ssafy.churest.entity.MemberHouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberHouseRepository extends JpaRepository<MemberHouse, Integer> {
    MemberHouse findByMember_MemberIdAndIsUsedIsTrue(int memberId);
}
