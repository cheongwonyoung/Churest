package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.GuestBookResponseDto;

import java.util.List;

public interface GuestBookService {
    List<GuestBookResponseDto.Info> getGuestBookList(int memberId);
}
