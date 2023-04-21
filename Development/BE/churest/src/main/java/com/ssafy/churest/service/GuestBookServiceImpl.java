package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.GuestBookRequestDto;
import com.ssafy.churest.dto.resp.GuestBookResponseDto;
import com.ssafy.churest.entity.GuestBook;
import com.ssafy.churest.repository.GuestBookRepository;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GuestBook")
@RequiredArgsConstructor
public class GuestBookServiceImpl implements GuestBookService{

    private final GuestBookRepository guestBookRepository;
    private final MemberRepository memberRepository;
    @Override
    public List<GuestBookResponseDto.Info> getGuestBookList(int memberId) {
        List<GuestBookResponseDto.Info> res = new ArrayList<>();
        List<GuestBook> guestBookList = guestBookRepository.findAllByToMember_MemberIdAndIsDeletedIsFalse(memberId);
        for (GuestBook g : guestBookList){
            GuestBookResponseDto.Info info = GuestBookResponseDto.Info.fromEntity(g);
            res.add(info);
        }

        return res;
    }

    @Override
    public void writeGuestBook(GuestBookRequestDto.Write writeInfo) {
        guestBookRepository.save(GuestBook.builder()
                .toMember(memberRepository.findById(writeInfo.getToMemberId()).get())
                .fromMember(memberRepository.findById(writeInfo.getFromMemberId()).get())
                .content(writeInfo.getContent()).build());
    }

    @Override
    public boolean checkWriteMember(int guestBookId, int fromMemberId) {
        int guestBookFromMemberId = guestBookRepository.findById(guestBookId).get().getFromMember().getMemberId();
        return guestBookFromMemberId == fromMemberId;
    }

    @Override
    public GuestBookResponseDto.Info modifyGuestBook(GuestBookRequestDto.Modify modifyInfo) {
        guestBookRepository.save(guestBookRepository.findById(modifyInfo.getGuestBookId()).get()
                .updateContent(modifyInfo.getContent()));
        GuestBookResponseDto.Info res = GuestBookResponseDto.Info.fromEntity(
                guestBookRepository.findById(modifyInfo.getGuestBookId()).get());
        return res;
    }

    @Override
    public void deleteGuestBook(int guestBookId) {
        guestBookRepository.save(guestBookRepository.findById(guestBookId).get().updateIsDeleted(true));
    }


}
