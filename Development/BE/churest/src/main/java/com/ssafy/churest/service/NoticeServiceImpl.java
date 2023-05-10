package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.NoticeResponseDto;
import com.ssafy.churest.entity.Notice;
import com.ssafy.churest.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("Notice")
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    private final NoticeRepository noticeRepository;

    @Override
    public List<NoticeResponseDto.tagInfo> saerch(int memberId) {

        List<NoticeResponseDto.tagInfo> res = new ArrayList<>();

        // 나한테 온 알림 전체 조회
        List<Notice> noticeList = noticeRepository.findAllByToMember_MemberIdAndIsCheckedIsFalse(memberId);

        for(int i=0; i<noticeList.size(); i++){
            NoticeResponseDto.tagInfo dto = NoticeResponseDto.tagInfo.fromEntity(noticeList.get(i));
            res.add(dto);
        }

        return res;
    }

    @Override
    public void check(int noticeId) {
        // 읽은 알림 읽음 처리
        Notice notice = noticeRepository.findById(noticeId).get();
        notice.setIsChecked(true);
        noticeRepository.save(notice);
    }
}
