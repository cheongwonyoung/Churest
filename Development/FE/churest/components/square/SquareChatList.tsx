type Props = {
  // sender: string;
  // message: string;
  messages: [];
  //  리스트로?
};

export default function SquareChatList({messages} : Props) {
  return (
    <div className="chat-list-box">
      {messages?.map((msg) =>
      <div className="msg">      
        {msg.type == 'ENTER' ? 
        (msg.sender + "님이 광장에 입장했습니다.") 
        : 
        (msg.sender + " : " + msg.message)}
      </div>
      )}
      <style jsx>{`
        .chat-list-box {
          width: 500px;
          height: 400px;
          backdrop-filter: blur(5px);
          background-color: #ebebeb8c;
          border-radius: 30px;
          box-shadow: 0px 3px 3px 0px rgba(209, 209, 209, 0.7),
            inset 0px -1px 8px 0px rgba(145, 145, 145, 0.9),
            inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);
          padding: 5% 5%;
        }
        .msg {
          font-weight: bold;
          margin: 3% 0;
        }
      `}</style>
    </div>
  );
}
