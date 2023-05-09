package com.ssafy.churest.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.ssafy.churest.dto.req.FCMNotificationRequestDto;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final MemberRepository memberRepository;

    public String sendNotificationByToken(FCMNotificationRequestDto requestDto){

        Member member = memberRepository.findByMemberId(requestDto.getTargetUserId());

        // 유저가 존재하는지
        if(member==null){
            // 토큰이 발급된 사람인지 확인
            return null;
        }
        else{
            return "해당 유저가 존재하지 않습니다";
        }

    }



}
