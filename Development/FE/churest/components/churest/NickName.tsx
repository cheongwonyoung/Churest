import { useState } from 'react';
import { useMutation } from 'react-query';
import { modifyNickname } from '@/apis/mypage';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import { BsPencil } from 'react-icons/bs';
import Swal from 'sweetalert2';

type Props = {
  handleNickname(e: any): void;
  nickname: string;
};

export default function NickName({ handleNickname, nickname }: Props) {
  const memberId = useRecoilValue(loginAtom).id;

  const [canInput, setInput] = useState(true);

  // 버튼 클릭 시 input 창으로 변경하는 함수
  const changeReadOnly = () => {
    setInput((prev) => !prev);
    const inp = document.getElementById('nickname');
    if (canInput) inp?.focus();
    console.log('바꿈!');
  };

  const canInputMessage = useMutation(
    (info: { memberId: number; nickname: string }) => modifyNickname(info),
    {
      onSuccess() {
        showAlert('닉네임 수정 완료');
      },
    }
  );

  const submitForm = () => {
    const info = {
      memberId: memberId,
      nickname: nickname,
    };
    canInputMessage.mutate(info);
  };

  const showAlert = (text: string) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const modifyButton = canInput ? (
    <div className="center">
      정보 수정하기&nbsp;
      <BsPencil />
    </div>
  ) : (
    <p onClick={submitForm}>수정</p>
  );

  return (
    <>
      <div className="container">
        <div>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => handleNickname(e)}
            readOnly={canInput}
            maxLength={20}
            placeholder="닉네임을 입력해주세요."
            className={
              canInput == true ? 'nickname-div ' : 'modify-input inside-clay'
            }
          />
          <div className="modify-btn center" onClick={changeReadOnly}>
            {modifyButton}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .nickname {
          border: transparent;
          line-height: 50px;
          font-size: 20px;
          font-weight: bold;
        }
        .nickname-div {
          background: blue;
          width: 180px;
          height: 30px;
          background: transparent;
          outline: 1px;
          text-align: center;
          border: none;
          border-radius: 10px;
          pointer-events: none;
          font-size: 20px;
        }
        .modify-btn {
          font-weight: bold;
          font-size: 18x;
          gap: 10px;
          margin-top: 10px;
        }
        .modify-btn:hover {
          transform: scale(1.1);
          transition: transform 0.5s;
          cursor: pointer;
        }
        .modify-input {
          background: red;
          width: 180px;
          height: 30px;
          background: transparent;
          outline: 1px;
          text-align: center;
          border-color: #bcffc83a;
          font-size: 20px;

          border-radius: 50px;
        }
      `}</style>
    </>
  );
}
