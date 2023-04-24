package com.ssafy.churest.repository;

import com.ssafy.churest.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    Board findByBoardId(int boardId);

    List<Board> findAllByIsDeletedIsFalseAndMember_MemberId(int memberId);
}
