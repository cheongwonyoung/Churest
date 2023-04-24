package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.BoardRequestDto;
import com.ssafy.churest.dto.resp.BoardResponseDto;
import com.ssafy.churest.dto.resp.TreeLogResponseDto;
import com.ssafy.churest.dto.resp.TreeResponseDto;
import com.ssafy.churest.entity.*;
import com.ssafy.churest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("BoardService")
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private static final int TREE_SIZE = 10;

    private static final int TREE_CRITERIA_SCORE = 16;

    private final GCSService gcsService;
    private final TreeLogService treeLogService;

    private final MemberRepository memberRepository;
    private final MemberBoardRepository memberBoardRepository;
    private final BoardRepository boardRepository;
    private final PhotoRepository photoRepository;
    private final TreeRepository treeRepository;
    private final TreeLogRepository treeLogRepository;
    private final TagRepository tagRepository;

    @Override
    public boolean checkTreeLocation(int memberId, BoardRequestDto.LocationInfo locationInfo) {
        //  해당 위치에서 어느 영역까지 안되는건지 ㅜ
        //  ㅁㅊ 기록에서 x,y 다 뒤져야하는?;;;
        return false;
    }

    @Override
    public void writeTree(List<MultipartFile> fileList, BoardRequestDto.Write writeInfo) throws IOException {

        //  먼저 위치 확인 해주기...? FE에서 먼저 해주나?

        //  나무 랜덤 매칭
        int treeId = (int) (Math.random() * TREE_SIZE) + 1;

        Member member = memberRepository.findByMemberId(writeInfo.getMemberId());

        Board board = boardRepository.save(Board.builder()
                        .member(member)
                        .tree(treeRepository.findByTreeId(treeId))
                        .title(writeInfo.getTitle())
                        .content(writeInfo.getContent())
                        .weather(writeInfo.getWeather())
                        .build());

        //  내 숲 속 추억 나무 위치 기록
        memberBoardRepository.save(MemberBoard.builder()
                        .member(member)
                        .board(board)
                        .locationX(writeInfo.getLocationX())
                        .locationY(writeInfo.getLocationY())
                        .build());

        //  GCS 사진 업로드
        for (MultipartFile file :
             fileList) {
                if(file != null)
                    gcsService.uploadBoardImage(file, board);
        }

        //  태그된 사용자 알림 생성 추가해야 함
        for (int tagMemberId:
             writeInfo.getTagList()) {
            tagRepository.save(Tag.builder()
                            .member(memberRepository.findByMemberId(tagMemberId))
                            .board(board)
                    .build());
            //  알림 생성 ...
        }

        //  나무 로그 생성
        treeLogRepository.save(TreeLog.builder().board(board).build());
    }

    @Override
    public void writeTreeFromFriend(int memberId, int boardId, BoardRequestDto.LocationInfo locationInfo) {

        //  내 숲 속 추억 나무 위치 기록
        memberBoardRepository.save(MemberBoard.builder()
                .member(memberRepository.findByMemberId(memberId))
                .board(boardRepository.findByBoardId(boardId))
                .locationX(locationInfo.getLocationX())
                .locationY(locationInfo.getLocationY())
                .build());

    }

    @Override
    public List<BoardResponseDto.BoardInfo> getBoardInfoList(int memberId) {

        List<MemberBoard> memberBoardList = memberBoardRepository.findAllByMember_MemberId(memberId);

        List<BoardResponseDto.BoardInfo> boardInfoList = new ArrayList<>();

        for (MemberBoard memberBoard:
            memberBoardList) {
                        Board board = memberBoard.getBoard();

            if(!board.isDeleted())
                boardInfoList.add(BoardResponseDto.BoardInfo.fromEntity(memberBoard, board, treeLogRepository.findTop1ByBoard_BoardId(board.getBoardId())));
        }

        return boardInfoList;

//        memberBoardList.stream().map(memberBoard -> {
//            Board board = memberBoard.getBoard();
//            if(!board.isDeleted())
//                return BoardResponseDto.BoardInfo.fromEntity(memberBoard, board, treeLogRepository.findTop1ByBoard_BoardId(board.getBoardId()));
//            return null;
//        }).collect(Collectors.toList());

        //  나무 위치 조회수
//        List<Board> boardList = boardRepository.findAllByIsDeletedIsFalseAndMember_MemberId(memberId);
//
//        BoardResponseDto.BoardInfo boardInfo = BoardResponseDto.BoardInfo.builder()
//                .build();
//        return boardList.stream().map(board -> {
//            return BoardResponseDto.BoardInfo.fromEntity(board, treeLogRepository.findTop1ByBoard_BoardId(board.getBoardId()));
////            BoardResponseDto.BoardInfo.builder()
////                    .locationX(board.getLocationX())
////                    .locationY(board.getLocationY())
////                            .score(treeLogRepository.findTop1ByOrderByDateAscAndBoard_BoardId(board.getBoardId()).getScore())
////                    .build()
//        }).collect(Collectors.toList());
    }

    @Override
    public BoardResponseDto.BoardDetailInfo getBoardDetailInfo(int memberId, int boardId) {

//        public BoardResponseDto.BoardDetailInfo getBoardDetailInfo(int boardId) {

        Board board = boardRepository.findByBoardId(boardId);

        if(board.isDeleted())
            return null;

        BoardResponseDto.BoardDetailInfo boardDetailInfo = BoardResponseDto.BoardDetailInfo.fromEntity(board);

        int recentTreeLogScore = treeLogService.updateScoreByView(boardId);

        if(recentTreeLogScore >= TREE_CRITERIA_SCORE){
            //  정렬?
            //  나무 성장 로그
            boardDetailInfo.setTreeLogInfoList(treeLogService.getTreeLogList(boardId));

            //  나무
            boardDetailInfo.setTreeInfo(TreeResponseDto.TreeInfo.fromEntity(board.getTree()));
        }

        //  파일 리스트
        boardDetailInfo.setFileList(photoRepository.findAllByBoard_BoardId(boardId).stream().map(photo -> photo.getFile()).collect(Collectors.toList()));

        //  태그된 사용자 id
        boardDetailInfo.setTagList(tagRepository.findAllByBoard_BoardId(board.getBoardId()).stream().map(tag -> tag.getMember().getMemberId()).collect(Collectors.toList()));

        //  isTagged
        boolean isTagged = (board.getMember().getMemberId() == memberId) ? true : tagRepository.existsByMember_MemberIdAndBoard_BoardId(memberId, boardId);
        boardDetailInfo.setTagged(isTagged);

        return boardDetailInfo;
    }
}
