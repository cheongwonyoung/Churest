package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.BoardRequestDto;
import com.ssafy.churest.dto.resp.BoardResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface BoardService {

    boolean checkTreeLocation(BoardRequestDto.LocationInfo locationInfo);

    void writeTree(List<MultipartFile> fileList, BoardRequestDto.Write writeInfo);



    BoardResponseDto.BoardDetailInfo getBoardInfo(int boardId);
}
