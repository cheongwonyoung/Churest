package com.ssafy.churest.repository;

import com.ssafy.churest.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
   List<Notice> findAllByToMember_MemberIdAndIsCheckedIsFalse(int memberId);

}
