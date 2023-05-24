import { BsFillSendFill } from 'react-icons/bs';
import { KeyboardEvent, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { movingAtom } from '@/atoms/inp';
type Props = {
  message: string;
  changeMsg(e: any): void;
  sendMessage(m: string): void;
};

export default function SquareChatInp({
  message,
  changeMsg,
  sendMessage,
}: Props) {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      sendMessage(message);
    }
  };

  const setIsMoving = useSetRecoilState(movingAtom);

  const focusChat = (e: any) => {
    if (e.code == 'Enter') {
      const chatInp = document.getElementById('chatInp');
      chatInp?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', focusChat);
    return () => {
      document.removeEventListener('keydown', focusChat);
    };
  });

  return (
    <div className="inp-box">
      <input
        type="text"
        className="chat-inp"
        id="chatInp"
        value={message}
        onChange={changeMsg}
        onKeyDown={onKeyDown}
        onFocus={() => setIsMoving(true)}
        onBlur={() => setIsMoving(false)}
      />

      <button className="chat-btn" onClick={() => sendMessage(message)}>
        <BsFillSendFill />
      </button>
      <style jsx>{`
        .inp-box {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
        }
        .chat-inp {
          width: 400px;
          height: 38px;
          border: none;
          backdrop-filter: blur(5px);
          background-color: #ebebeb8c;
          border-radius: 10px;
          box-shadow: 0px 3px 3px 0px rgba(209, 209, 209, 0.7),
            inset 0px -1px 8px 0px rgba(145, 145, 145, 0.9),
            inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);
          padding-left: 12px;
        }
        .chat-inp:focus {
          outline: none;
        }
        .chat-btn {
          margin-left: 10px;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border: none;
          backdrop-filter: blur(5px);
          background-color: #ebebeb8c;
          box-shadow: 0px 3px 3px 0px rgba(209, 209, 209, 0.7),
            inset 0px -1px 8px 0px rgba(145, 145, 145, 0.9),
            inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);
        }
        .chat-btn:hover {
          transform: scale(1.05);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
