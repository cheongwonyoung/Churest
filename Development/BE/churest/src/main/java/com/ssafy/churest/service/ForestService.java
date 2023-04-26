package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.ForestResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ForestService {

    List<ForestResponseDto.OtherForestInfo> getOtherForestList(int memberId);

    ForestResponseDto.ForestInfo getForestInfo(int memberId);

}
