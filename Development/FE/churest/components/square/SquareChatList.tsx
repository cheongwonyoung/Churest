import { v4 as uuidv4 } from 'uuid';
import { useRef, useEffect } from 'react';

type Props = {
  messages: any[];
};

export default function SquareChatList({ messages }: Props) {
  // 스크롤 맨 아래로 가게 하기
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-list-box sroll-bar">
      {messages?.map((msg) => (
        <div key={uuidv4()}>
          {msg.type == 'ENTER' ? (
            <p className="enter-msg">
              {msg.sender}
              님이 광장에 입장했습니다.
            </p>
          ) : (
            <p className="msg">
              <div className="name-msg">{msg.sender}&nbsp;:&nbsp;</div>
              {msg.message}
            </p>
          )}
        </div>
      ))}
      <style jsx>{`
        .chat-list-box {
          height: 300px;
          background-color: #ebebeb8c;
          border-radius: 30px;
          box-shadow: 0px 3px 3px 0px rgba(209, 209, 209, 0.7),
            inset 0px -1px 8px 0px rgba(145, 145, 145, 0.9),
            inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);
          padding: 5% 5%;
          display: flex;
          flex-direction: column;
          overflow-y: scroll;
        }
        .enter-msg {
          color: rgb(97, 97, 97);
          text-align: center;
          margin: 1% 0;
        }
        .msg {
          display: inline-block;
          font-weight: bold;
          margin: 1% 0;
        }
        /* 스크롤바 설정*/
        .chat-list-box::-webkit-scrollbar {
          width: 10px;
        }

        /* 스크롤바 막대 설정*/
        .chat-list-box::-webkit-scrollbar-thumb {
          background: linear-gradient(rgba(161, 173, 193, 0.499), #a2a2bd8b);
          border-radius: 25px;
        }

        /* 스크롤바 뒷 배경 설정*/
        .chat-list-box::-webkit-scrollbar-track {
          background-color: #b1b1b11f;
        }
        .name-msg,
        .centent-msg {
          display: inline-block;
          font-weight: bold;
        }
      `}</style>
      <div ref={bottomRef} />
    </div>
  );
}
