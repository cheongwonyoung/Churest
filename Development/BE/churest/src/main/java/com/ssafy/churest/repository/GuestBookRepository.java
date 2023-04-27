package com.ssafy.churest.repository;

import com.ssafy.churest.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuestBookRepository extends JpaRepository<GuestBook, Integer> {

    List<GuestBook> findAllByToMember_MemberIdAndIsDeletedIsFalseOrderByCreatedTimeDesc(int memberId);
}
