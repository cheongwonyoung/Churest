package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.BoardRequestDto;
import com.ssafy.churest.dto.resp.BoardResponseDto;
import com.ssafy.churest.entity.Board;
import com.ssafy.churest.entity.Tag;
import com.ssafy.churest.entity.TreeLog;
import com.ssafy.churest.repository.BoardRepository;
import com.ssafy.churest.repository.TagRepository;
import com.ssafy.churest.repository.TreeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service("TreeService")
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private static final int TREE_SIZE = 10;

//    private final MemberRepository memberRepository;

    private final BoardRepository boardRepository;
//    private final TreeRepository treeRepository;
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

//        int treeId = (int) (Math.random() * TREE_SIZE) + 1;

        Board board = boardRepository.save(Board.builder()
//                        .tree(treeRepository.findByTreeId(treeId))
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

        //  태그된 사용자 알림 생성
        for (int tagMemberId:
             writeInfo.getTagList()) {
            tagRepository.save(Tag.builder()
//                            .member(memberRepository.findByMemberId(tagMemberId))
                            .board(board)
                    .build());
        }

        //  나무 로그 생성
        treeLogRepository.save(TreeLog.builder().board(board).build());
    }

    @Override
    public BoardResponseDto.BoardDetailInfo getBoardInfo(int boardId) {


        return null;
    }
}
