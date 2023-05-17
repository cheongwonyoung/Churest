package com.ssafy.churest.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.churest.dto.req.FCMNotificationRequestDto;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.entity.Notice;
import com.ssafy.churest.repository.MemberRepository;
import com.ssafy.churest.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
@Slf4j
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final MemberRepository memberRepository;
    private final NoticeRepository noticeRepository;

    public String sendNotificationByToken(FCMNotificationRequestDto requestDto){

        Member toMember = memberRepository.findByMemberId(requestDto.getTargetUserId());
        Member fromMember = memberRepository.findByMemberId(requestDto.getFromUserId());
//        알림 생성해서 저장
        Notice notice = noticeRepository.findById(requestDto.getNoticeId()).get();

        // 유저가 존재하는지
        if(toMember!=null){
            // 토큰이 발급된 사람인지 확인
            if(toMember.getFcmToken() != null) {
                Notification notification = Notification.builder()
                        .setTitle(requestDto.getTitle())
                        .setBody(LocalDate.from(notice.getDate()).toString())
                        .build();

                Message message = Message.builder()
                        .setToken(toMember.getFcmToken())
                        .setNotification(notification)
                        .build();
                try {
                    firebaseMessaging.send(message);
                    return "알림을 성공적으로 전송했습니다. targetUserId=" + requestDto.getTargetUserId();
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                    return "알림 보내기를 실패하였습니다. targetUserId=" + requestDto.getTargetUserId();
                }
            }
            // fcmToken이 존재하지 않을 때
            else{
                return "서버에 저장된 해당 유저의 FirebaseToken이 존재하지 않습니다. targetUserId=" + requestDto.getTargetUserId();
            }

        }
        else{
            return "해당 유저가 존재하지 않습니다. targetUserId=" + requestDto.getTargetUserId();
        }

    }



}
