package com.ssafy.churest.repository;

import com.ssafy.churest.entity.MemberBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberBoardRepository extends JpaRepository<MemberBoard, Integer> {

    List<MemberBoard> findAllByMember_MemberId(int memberId);
    List<MemberBoard> findAllByBoard_BoardId(int boardId);

    MemberBoard findByMember_MemberIdAndBoard_BoardId(int memberId, int boardId);

    Boolean existsByMember_MemberIdAndBoard_BoardId(int memberId, int boardId);
}
