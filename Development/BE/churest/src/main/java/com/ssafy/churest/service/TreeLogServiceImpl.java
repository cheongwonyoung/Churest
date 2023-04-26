package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.TreeLogResponseDto;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.entity.Tag;
import com.ssafy.churest.entity.TreeLog;
import com.ssafy.churest.repository.BoardRepository;
import com.ssafy.churest.repository.MemberRepository;
import com.ssafy.churest.repository.TagRepository;
import com.ssafy.churest.repository.TreeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service("TreeLogService")
@RequiredArgsConstructor
public class TreeLogServiceImpl implements TreeLogService {

    private final MemberRepository memberRepository;
    private final TreeLogRepository treeLogRepository;
    private final BoardRepository boardRepository;
    private final TagRepository tagRepository;
    private static final int TREE_CRITERIA_SCORE = 16;

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
    public TreeLogResponseDto.RecentTreeLogInfo updateScoreByWatering(int boardId) {

        boolean isReward = false;

        TreeLog recentTreeLog = treeLogRepository.findTop1ByBoard_BoardId(boardId);
        recentTreeLog.setScore(recentTreeLog.getScore() + 3);

        if(!recentTreeLog.getBoard().isPayed() && recentTreeLog.getScore() >= TREE_CRITERIA_SCORE) {
            List<Member> memberList = tagRepository.findAllByBoard_BoardId(boardId).stream().map(tag -> tag.getMember().rewardCoin()).collect(Collectors.toList());
            memberList.add(recentTreeLog.getBoard().getMember().rewardCoin());
            memberRepository.saveAllAndFlush(memberList);
            boardRepository.save(recentTreeLog.getBoard().updatePayed(true));
            isReward = true;
        }

        if(recentTreeLog.getDate().equals(LocalDate.now()))
            return TreeLogResponseDto.RecentTreeLogInfo.builder().treeLogInfo(TreeLogResponseDto.TreeLogInfo.fromEntity(treeLogRepository.save(recentTreeLog))).isReward(isReward).build();
        else
            return TreeLogResponseDto.RecentTreeLogInfo.builder().treeLogInfo(TreeLogResponseDto.TreeLogInfo.fromEntity(treeLogRepository.save(TreeLog.builder().score(recentTreeLog.getScore()).build()))).isReward(isReward).build();

    }
}
