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
  return (
    <div>
      <input type="text" name="" id="" value={message} onChange={changeMsg} />
      <button onClick={() => sendMessage(message)}>메시지 보냉</button>
    </div>
  );
}
