package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.MyPageRequestDto;
import com.ssafy.churest.dto.resp.BoardResponseDto;
import com.ssafy.churest.dto.resp.MemberResponseDto;
import com.ssafy.churest.dto.resp.TreeLogResponseDto;
import com.ssafy.churest.dto.resp.TreeResponseDto;
import com.ssafy.churest.entity.Board;
import com.ssafy.churest.entity.MemberBoard;
import com.ssafy.churest.entity.TreeLog;
import com.ssafy.churest.repository.BoardRepository;
import com.ssafy.churest.repository.MemberBoardRepository;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("MyPageService")
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final MemberBoardRepository memberBoardRepository;
    @Override
    public Map<String, Object> getMyPageInfo(int memberId) {
        Map<String, Object> res = new HashMap<>();

        // 회원 정보
        res.put("member", MemberResponseDto.LittleInfo.fromEntity(memberRepository.findById(memberId).get()));

        // 회원의 츄레스트에 있는 글 목록 정보
        List<BoardResponseDto.MyPageInfo> boardInfo = new ArrayList<>();

        // 내가 쓴 글 + 퍼온 글
        List<Board> boardList = new ArrayList<>();
        List<MemberBoard> memberBoardList = memberBoardRepository.findAllByMember_MemberId(memberId);
        for (MemberBoard mb : memberBoardList){
            boardList.add(boardRepository.findByBoardId(mb.getBoard().getBoardId()));
        }
        boardList.sort((o1, o2) -> o2.getCreatedTime().compareTo(o1.getCreatedTime()));

        for (Board b : boardList){
            BoardResponseDto.MyPageInfo info = BoardResponseDto.MyPageInfo.fromEntity(b);
            info.setScore(getScore(b.getBoardId()));
            if(info.getScore() > 15)
                info.setTreeInfo(getBoardTreeInfo(info.getBoardId()));

            boardInfo.add(info);
        }

        res.put("boards", boardInfo);

        return res;
    }

    @Override
    public void updateNickname(MyPageRequestDto.UpdateNickname info) {
        memberRepository.save(memberRepository.findById(info.getMemberId()).get().updateNickname(info.getNickname()));
    }

    @Override
    public void updateAvatar(MyPageRequestDto.UpdateAvatar info) {
        memberRepository.save(memberRepository.findById(info.getMemberId()).get().updateAvatar(info.getAvatarId()));
    }

    @Override
    public int getScore(int boardId) {
        List<TreeLog> treeLogList = boardRepository.findByBoardId(boardId).getTreeLogs();
        return treeLogList.get(treeLogList.size() - 1).getScore();
    }

    @Override
    public TreeResponseDto.TreeInfo getBoardTreeInfo(int boardId) {
        return TreeResponseDto.TreeInfo.fromEntity(boardRepository.findByBoardId(boardId).getTree());
    }
}
