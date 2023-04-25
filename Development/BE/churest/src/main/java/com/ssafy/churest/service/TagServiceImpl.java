package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.TagResponseDto;
import com.ssafy.churest.entity.Board;
import com.ssafy.churest.entity.Tag;
import com.ssafy.churest.repository.BoardRepository;
import com.ssafy.churest.repository.MemberBoardRepository;
import com.ssafy.churest.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("TagService")
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final MemberBoardRepository memberBoardRepository;
    private final BoardRepository boardRepository;

    @Override
    public List<TagResponseDto.TagInfo> getTagList(int memberId) {
        List<Tag> tagList = tagRepository.findAllByMember_MemberId(memberId);

        if(tagList.isEmpty())
            return null;

        List<TagResponseDto.TagInfo> tagInfoList = new ArrayList<>();
        for (Tag tag:
             tagList) {
            Board board = boardRepository.findByBoardId(tag.getBoard().getBoardId());
            tagInfoList.add(TagResponseDto.TagInfo.builder()
                            .tagId(tag.getTagId())
                            .boardId(board.getBoardId())
                            .title(board.getTitle())
                            .createdTime(board.getCreatedTime())
                            .isTaken(memberBoardRepository.existsByMember_MemberIdAndBoard_BoardId(memberId, board.getBoardId()))
                    .build());
        }

        return tagInfoList;
    }
}
