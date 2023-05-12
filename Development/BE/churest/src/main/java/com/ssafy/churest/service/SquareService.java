package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.SquareResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface SquareService {

    public SquareResponseDto.DonateInfo getDonateInfo(int memberId);
}
