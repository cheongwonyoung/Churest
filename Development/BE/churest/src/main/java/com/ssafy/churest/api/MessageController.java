package com.ssafy.churest.api;

import com.ssafy.churest.dto.resp.ChatMessage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api("chat Controller API v1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class MessageController
{
    private final SimpMessageSendingOperations sendingOperations;

    @ApiOperation(value = "채팅", notes = "채팅 메시지")
    @MessageMapping("/message")
    public void enter(@RequestBody ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender()+"님이 입장하였습니다.");
        }
        // roomId는 태그된 상대 id로. 광장은 몇으로..?
        sendingOperations.convertAndSend("/sub/chat/room"+message.getRoomId(), message);
    }
}
