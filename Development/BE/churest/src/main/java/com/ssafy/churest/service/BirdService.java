package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.BirdResponseDto;

import java.util.List;

public interface BirdService {
    List<BirdResponseDto.SmallInfo> getBirdList ();
}
