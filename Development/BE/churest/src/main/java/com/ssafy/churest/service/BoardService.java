package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.BoardRequestDto;
import com.ssafy.churest.dto.resp.BoardResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface BoardService {

    boolean checkTreeLocation(int memberId, BoardRequestDto.LocationInfo locationInfo);

    void writeTree(List<MultipartFile> fileList, BoardRequestDto.Write writeInfo) throws IOException;

    void writeTreeFromFriend(int memberId, int boardId, BoardRequestDto.LocationInfo locationInfo);

    List<BoardResponseDto.BoardInfo> getBoardInfoList(int memberId);

    BoardResponseDto.BoardDetailInfo getBoardDetailInfo(int memberId, int boardId);

}
