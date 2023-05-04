package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.TagResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TagService {
    List<TagResponseDto.TagInfo> getTagList(int memberId);
}
