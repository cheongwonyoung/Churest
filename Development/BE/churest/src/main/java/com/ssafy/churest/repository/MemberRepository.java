package com.ssafy.churest.repository;

import com.ssafy.churest.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByMemberId(int memberId);

    @Query(value = "SELECT * FROM churest.member WHERE member_id != (:memberId) ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Member> findAll(@Param("memberId") int memberId);

    List<Member> findAllByNicknameContainingAndMemberIdIsNot(String nickname, int memberId);
    Member findByEmail(String email);
    Member findByToken(String token);
}
