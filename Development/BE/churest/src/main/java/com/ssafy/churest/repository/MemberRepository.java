package com.ssafy.churest.repository;

import com.ssafy.churest.entity.Member;

public interface MemberRepository {
    Member findByMember_MemberId(int memberId);
}
