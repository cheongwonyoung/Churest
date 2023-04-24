package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.TreeLogResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TreeLogService {

    List<TreeLogResponseDto.TreeLogInfo> getTreeLogList(int boardId);

    int updateScoreByView(int boardId);

    TreeLogResponseDto.TreeLogInfo updateScoreByWatering(int boardId);
}
