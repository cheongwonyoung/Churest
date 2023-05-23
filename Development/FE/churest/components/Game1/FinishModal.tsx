import { gameFinishAtom } from '@/atoms/modal';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

export default function FinishModal() {
  const [winner, setWinner] = useRecoilState(gameFinishAtom);
  const router = useRouter();
  return (
    <div className="blue-clay finish-container">
      <div className="finish-box">
        <p>{winner.win} 승리하였습니다.</p>
        <div className="btn-box">
          <button
            className="green-btn"
            onClick={() => setWinner({ isModal: false, win: '' })}
          >
            다시하기
          </button>
          <button
            className="green-btn no-btn"
            onClick={() => {
              setWinner({ ...winner, isModal: false });
              router.push('/square');
            }}
          >
            광장으로가기
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .finish-container {
            width: 800px;
            gap: 20px;
          }
          .finish-container p {
            font-size: 48px;
            color: rgb(78, 78, 78);
            font-weight: 700;
          }
          .finish-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
          }
          .btn-box {
            display: flex;
            gap: 20px;
          }
          .no-btn {
            background: linear-gradient(315deg, #bb72ff 0%, #ff8f6d 100%);
          }
        `}
      </style>
    </div>
  );
}
