package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.TreeLogResponseDto;
import com.ssafy.churest.entity.TreeLog;
import com.ssafy.churest.repository.TreeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service("TreeLogService")
@RequiredArgsConstructor
public class TreeLogServiceImpl implements TreeLogService {

    private final TreeLogRepository treeLogRepository;

    @Override
    public List<TreeLogResponseDto.TreeLogInfo> getTreeLogList(int boardId) {
        return treeLogRepository.findAllByBoard_BoardId(boardId).stream().map(TreeLogResponseDto.TreeLogInfo::fromEntity).collect(Collectors.toList());
    }

    @Override
    public int updateScoreByView(int boardId) {

        TreeLog recentTreeLog = treeLogRepository.findTop1ByBoard_BoardId(boardId);

        if(recentTreeLog.getDate().equals(LocalDate.now())) {
            recentTreeLog.setScore(recentTreeLog.getScore() + 1);
            return treeLogRepository.save(recentTreeLog).getScore();
        }
        else {
            return treeLogRepository.save(TreeLog.builder().score(recentTreeLog.getScore() + 1).build()).getScore();
        }

    }

    @Override
    public TreeLogResponseDto.TreeLogInfo updateScoreByWatering(int boardId) {

        TreeLog recentTreeLog = treeLogRepository.findTop1ByBoard_BoardId(boardId);

        if(recentTreeLog.getDate().equals(LocalDate.now())) {
            recentTreeLog.setScore(recentTreeLog.getScore() + 1);
            return TreeLogResponseDto.TreeLogInfo.fromEntity(treeLogRepository.save(recentTreeLog));
        }
        else {
            return TreeLogResponseDto.TreeLogInfo.fromEntity(treeLogRepository.save(TreeLog.builder().score(recentTreeLog.getScore() + 1).build()));
        }

    }
}
