package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.GuestBookRequestDto;
import com.ssafy.churest.dto.resp.GuestBookResponseDto;

import java.util.List;

public interface GuestBookService {
    List<GuestBookResponseDto.Info> getGuestBookList(int memberId);

    void writeGuestBook(GuestBookRequestDto.Write writeInfo);

    boolean checkWriteMember(int guestBookId, int toMemberId);

    GuestBookResponseDto.Info modifyGuestBook(GuestBookRequestDto.Modify modifyInfo);

    void deleteGuestBook(int guestBookId);
}
