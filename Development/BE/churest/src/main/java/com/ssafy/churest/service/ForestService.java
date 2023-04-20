package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.ForestResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface ForestService {

    ForestResponseDto.ForestInfo getForestInfo(int memberId);
}
