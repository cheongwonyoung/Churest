import { BsFillSendFill } from 'react-icons/bs';
import { KeyboardEvent } from 'react';
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

  return (
    <div className="inp-box">
      <input
        type="text"
        className="chat-inp"
        value={message}
        onChange={changeMsg}
        onKeyDown={onKeyDown}
      />

      <button className="chat-btn" onClick={() => sendMessage(message)}>
        <BsFillSendFill />
      </button>
      <style jsx>{`
        .inp-box {
          width: 500px;
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
        }
        .chat-inp {
          width: 438px;
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
      `}</style>
    </div>
  );
}
