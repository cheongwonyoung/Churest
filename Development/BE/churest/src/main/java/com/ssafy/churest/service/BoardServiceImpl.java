package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.BoardRequestDto;
import com.ssafy.churest.dto.resp.BoardResponseDto;
import com.ssafy.churest.dto.resp.TreeLogResponseDto;
import com.ssafy.churest.dto.resp.TreeResponseDto;
import com.ssafy.churest.entity.Board;
import com.ssafy.churest.entity.Tag;
import com.ssafy.churest.entity.TreeLog;
import com.ssafy.churest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service("TreeService")
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private static final int TREE_SIZE = 10;

    private static final int TREE_CRITERIA_SCORE = 16;

    private final MemberRepository memberRepository;

    private final BoardRepository boardRepository;
    private final TreeRepository treeRepository;
    private final TreeLogRepository treeLogRepository;
    private final TagRepository tagRepository;

    @Override
    public boolean checkTreeLocation(BoardRequestDto.LocationInfo locationInfo) {
        //  해당 위치에서 어느 영역까지 안되는건지 ㅜ

        return false;
    }

    @Override
    public void writeTree(List<MultipartFile> fileList, BoardRequestDto.Write writeInfo) {

        //  나무 랜덤 매칭
        //  조회수 나무에 해당될 때에 생성..?

        int treeId = (int) (Math.random() * TREE_SIZE) + 1;

        Board board = boardRepository.save(Board.builder()
                        .tree(treeRepository.findByTree_TreeId(treeId))
                        .title(writeInfo.getTitle())
                        .content(writeInfo.getContent())
                        .weather(writeInfo.getWeather())
                        .locationX(writeInfo.getLocationX())
                        .locationY(writeInfo.getLocationY())
                        .build());


        //  GCS 사진 업로드
//        for (MultipartFile file :
//             fileList) {
//
//        }

        //  태그된 사용자 알림 생성 추가해야 함
        for (int tagMemberId:
             writeInfo.getTagList()) {
            tagRepository.save(Tag.builder()
                            .member(memberRepository.findByMember_MemberId(tagMemberId))
                            .board(board)
                    .build());
            //  알림 생성
        }

        //  나무 로그 생성
        treeLogRepository.save(TreeLog.builder().board(board).build());
    }

    @Override
    public List<BoardResponseDto.BoardInfo> getBoardList(int memberId) {
        return null;
    }

    @Override
    public BoardResponseDto.BoardDetailInfo getBoardDetailInfo(int boardId) {

        Board board = boardRepository.findByBoard_BoardId(boardId);

        if(board.isDeleted())
            return null;

        BoardResponseDto.BoardDetailInfo boardDetailInfo = BoardResponseDto.BoardDetailInfo.fromEntity(board);

        TreeLog recentTreeLog = treeLogRepository.findByBoard_BoardId(board.getBoardId());
        if(recentTreeLog.getScore() >= TREE_CRITERIA_SCORE){
            //  정렬?
            //  나무 성장 로그
            List<TreeLog> treeLogList = treeLogRepository.findAllByBoard_BoardId(board.getBoardId());
            boardDetailInfo.setTreeLogInfoList(treeLogList.stream().map(TreeLogResponseDto.TreeLogInfo::fromEntity).collect(Collectors.toList()));

            //  나무
            boardDetailInfo.setTreeInfo(TreeResponseDto.TreeInfo.fromEntity(board.getTree()));
        }

//        //  파일 리스트
//        private List<String> fileList;
//
        //  태그된 사용자 id
        List<Tag> tagList = tagRepository.findAllByBoard_BoardId(board.getBoardId());
        boardDetailInfo.setTagList(tagList.stream().map(tag -> tag.getMember().getMemberId()).collect(Collectors.toList()));

        return boardDetailInfo;
    }
}
