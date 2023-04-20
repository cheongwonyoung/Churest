package com.ssafy.churest.repository;

import com.ssafy.churest.entity.MemberBird;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberBirdRepository extends JpaRepository<MemberBird, Integer> {
    MemberBird findByMember_MemberIdAndIsUsedIsTrue(int memberId);
}
