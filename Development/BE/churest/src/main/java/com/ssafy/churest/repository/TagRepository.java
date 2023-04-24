package com.ssafy.churest.repository;

import com.ssafy.churest.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    List<Tag> findAllByBoard_BoardId(int boardId);

    Boolean existsByMember_MemberIdAndBoard_BoardId(int memberId, int boardId);
}
