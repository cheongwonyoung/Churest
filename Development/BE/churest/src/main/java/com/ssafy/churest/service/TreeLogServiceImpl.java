package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.FCMNotificationRequestDto;
import com.ssafy.churest.dto.resp.TreeLogResponseDto;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.entity.Notice;
import com.ssafy.churest.entity.Tag;
import com.ssafy.churest.entity.TreeLog;
import com.ssafy.churest.repository.*;
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
    private final FCMNotificationService fcmNotificationService;
    private static final int TREE_CRITERIA_SCORE = 16;
    private final NoticeRepository noticeRepository;

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
            return treeLogRepository.save(TreeLog.builder().board(recentTreeLog.getBoard()).score(recentTreeLog.getScore() + 1).build()).getScore();
        }

    }

    @Override
    public TreeLogResponseDto.RecentTreeLogInfo updateScoreByWatering(int boardId, int memberId) {

        boolean isReward = false;

        TreeLog recentTreeLog = treeLogRepository.findTop1ByBoard_BoardId(boardId);
        recentTreeLog.setScore(recentTreeLog.getScore() + 3);

        if(!recentTreeLog.getBoard().isPayed() && recentTreeLog.getScore() >= TREE_CRITERIA_SCORE) {
            List<Member> memberList = tagRepository.findAllByBoard_BoardId(boardId).stream().map(tag -> tag.getMember().rewardCoin()).collect(Collectors.toList());
            memberList.add(recentTreeLog.getBoard().getMember().rewardCoin());
            memberRepository.saveAllAndFlush(memberList);
            boardRepository.save(recentTreeLog.getBoard().updatePayed(true));
            isReward = true;

//            알림 전송
            FCMNotificationRequestDto requestDto = FCMNotificationRequestDto.builder().fromUserId(memberId).targetUserId(memberId).title("쥬잉님 저 다 컸떠용").build();
            Member member = memberRepository.findByMemberId(memberId);
            fcmNotificationService.sendNotificationByToken(requestDto);
            noticeRepository.save(Notice.builder().toMember(member).fromMember(member).content("쥬잉님 저 다 컸떠용").build());
        }

        if(recentTreeLog.getDate().equals(LocalDate.now()))
            return TreeLogResponseDto.RecentTreeLogInfo.builder().treeLogInfo(TreeLogResponseDto.TreeLogInfo.fromEntity(treeLogRepository.save(recentTreeLog))).isReward(isReward).build();
        else
            return TreeLogResponseDto.RecentTreeLogInfo.builder().treeLogInfo(TreeLogResponseDto.TreeLogInfo.fromEntity(treeLogRepository.save(TreeLog.builder().board(recentTreeLog.getBoard()).score(recentTreeLog.getScore()).build()))).isReward(isReward).build();

    }
}
