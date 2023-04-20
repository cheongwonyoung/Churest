package com.ssafy.churest.repository;

import com.ssafy.churest.dto.req.MemberBirdRequestDto;
import com.ssafy.churest.entity.MemberBird;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberBirdRepository extends JpaRepository<MemberBird, Integer> {

    MemberBird findByMember_MemberIdAndBird_BirdId(int memberId, int birdId);
    MemberBird findByMember_MemberIdAndIsUsedIsTrue(int memberId);
    List<MemberBird> findAllByMember_MemberId(int memberId);
}
