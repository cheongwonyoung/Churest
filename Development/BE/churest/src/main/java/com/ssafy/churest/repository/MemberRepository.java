package com.ssafy.churest.repository;

import com.ssafy.churest.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByMemberId(int memberId);

    List<Member> findAllByNicknameContainingAndMemberIdIsNot(String nickname, int memberId);
}
