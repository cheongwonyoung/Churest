package com.ssafy.churest.service;

import com.ssafy.churest.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Service("Notice")
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    private final NoticeRepository noticeRepository;

    @Override
    public Object saerch(int memberId) {


        return null;
    }
}
