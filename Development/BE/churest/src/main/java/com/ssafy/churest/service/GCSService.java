package com.ssafy.churest.service;

import com.ssafy.churest.entity.Board;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface GCSService {

    public String uploadBoardImage(MultipartFile file, Board board) throws IOException;

    public List<String> uploadBoardImageList(List<MultipartFile> fileList, Board board) throws IOException;
}
