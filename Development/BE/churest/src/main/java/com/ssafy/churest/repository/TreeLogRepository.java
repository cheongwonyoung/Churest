package com.ssafy.churest.repository;

import com.ssafy.churest.entity.TreeLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TreeLogRepository extends JpaRepository<TreeLog, Integer> {

//    TreeLog findByTreeLog_TreeLogId(int treeLogId);

    TreeLog findTop1ByBoard_BoardId(int boardId);

    List<TreeLog> findAllByBoard_BoardId(int boardId);

}
