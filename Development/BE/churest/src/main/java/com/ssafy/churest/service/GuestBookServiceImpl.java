package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.GuestBookResponseDto;
import com.ssafy.churest.entity.GuestBook;
import com.ssafy.churest.repository.GuestBookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GuestBook")
@RequiredArgsConstructor
public class GuestBookServiceImpl implements GuestBookService{

    private final GuestBookRepository guestBookRepository;
    @Override
    public List<GuestBookResponseDto.Info> getGuestBookList(int memberId) {
        List<GuestBookResponseDto.Info> res = new ArrayList<>();

        List<GuestBook> guestBookList = guestBookRepository.findByToMember_MemberIdAndIsDeletedIsFalse(memberId);
        for (GuestBook g : guestBookList){
            GuestBookResponseDto.Info info = GuestBookResponseDto.Info.fromEntity(g);
            res.add(info);
        }

        return res;
    }
}
