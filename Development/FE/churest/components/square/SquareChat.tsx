import { useEffect, useState, useRef, useCallback, memo } from 'react';
import * as StompJS from '@stomp/stompjs';
import SquareChatInp from './SquareChatInp';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import SquareChatList from './SquareChatList';
import Swal from 'sweetalert2';

export default memo(function SquareChat() {
  const baseURL = 'ws://k8a505.p.ssafy.io/chat/websocket';
  const nickname = useRecoilValue(loginAtom)!.nickname;
  const client: any = useRef({});
  const roomId = 1;
  const [message, setMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [messageList, setMessageList] = useState<{ [key: string]: any }[]>([]);

  const connect = () => {
    // 연결할 때
    client.current = new StompJS.Client({
      brokerURL: baseURL,
      connectHeaders: {
        login: 'user',
        password: 'password',
      },
      onConnect: () => {
        setConnected(true);
        subscribe(); // 연결 성공 시 구독하는 로직 실행
        //  입장하였습니다. json_body로 받기 위해서 추가함
        sendEnterMessage(nickname);
      },
      onWebSocketError: (err) => {},
    });
    client.current.activate(); // 클라이언트 활성화
  };

  const subscribe = () => {
    client.current.subscribe('/sub/chat/room/' + roomId, (body: any) => {
      const json_body = JSON.parse(body.body);
      setMessageList((messageList: any[]) => [json_body, ...messageList]);
    });
  };
  const disConnect = () => {
    if (connected) {
      client.current.deactivate();
      setConnected(false);
    }
  };

  useEffect(() => {
    connect();
    return () => {
      disConnect();
    };
  }, []);

  const sendEnterMessage = (sender: string) => {
    client.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({
        type: 'ENTER',
        roomId,
        sender: sender,
        message: '',
      }),
    });
  };

  const sendMessage = (message: string) => {
    if (message.trim().length < 1) {
      // const chatInp = document.getElementById('chatInp');
      // chatInp?.blur();
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '공백은 입력이 불가합니다',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      client.current.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId,
          // sender: userId,
          sender: nickname,
          message: message,
        }),
      });
      //  메세지 보내고 SquareChatInp 빈칸 만들기
      setMessage('');
    }
  };

  const changeMsg = useCallback((e: any) => {
    setMessage(e.target.value);
  }, []);

  return (
    <div>
      <p>메시지</p>
      <div className="chat-box">
        <SquareChatList messages={messageList?.slice(0).reverse()} />
        <SquareChatInp
          message={message}
          changeMsg={changeMsg}
          sendMessage={sendMessage}
        />
      </div>
      <button onClick={() => console.log(client.current.connected)}>
        소켓소켓
      </button>
      <style jsx>{`
        .chat-box {
          position: absolute;
          bottom: 24px;
          left: 24px;
          z-index: 100px;
        }
      `}</style>
    </div>
  );
});
