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
    <div className="chat-list-box">
      {messages?.map((msg) => (
        <div key={uuidv4()}>
          {msg.type == 'ENTER' ? (
            <p className="enter-msg">{msg.sender}님이 광장에 입장했습니다.</p>
          ) : (
            <p className="msg">
              {msg.sender}: {msg.message}
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
          overflow: auto;
        }
        .enter-msg {
          font-weight: bold;
          text-align: center;
          margin: 1% 0;
        }
        .msg {
          font-weight: bold;
          margin: 1% 0;
        }
      `}</style>
      <div ref={bottomRef} />
    </div>
  );
}