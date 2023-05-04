import Image from 'next/image';
import NextBtn from './NextBtn';
import { images } from '@/public/assets/images';
import { useState } from 'react';

type Props = {
  handlePickedAvatar(i: any): void;
  pickedAvatar: string;
  plusPage(): void;
};

export default function StepNickname({
  handlePickedAvatar,
  pickedAvatar,
  plusPage,
}: Props) {
  console.log('고른 아바타는');
  console.log(pickedAvatar);

  // 닉네임 입력
  const [nickname, setName] = useState('');
  const handleName = (e: any) => {
    setName(e.target.value);
    console.log('내 닉넴은 ' + nickname);
  };

  return (
    <>
      <div className="">
        <div className="center">
          <Image src={images.avatar_1_img} alt="" width={300} height={400} />
        </div>
        <input
          placeholder="닉네임을 입력해주세요 (최대 6자)"
          className="inside-clay"
          onChange={(e) => handleName(e)}
        />
        <div className="center">
          {pickedAvatar && (
            <NextBtn comment={'다음 스텝으로'} logic={plusPage} />
          )}
        </div>
      </div>
      <style jsx>{`
        input {
          width: 350px;
          height: 40px;
          outline: 0px;
          border: none;
          text-align: center;
        }
        input::placeholder {
          color: rgba(169, 162, 214, 1);
          font-size: 16px;
          line-height: 40px;
        }
        input:focus {
          outline: none;
          border-color: #ff97d3;
          box-shadow: inset 0 1px 4px #c7daff, 0 0 20px 2px #c7daff;
        }
      `}</style>
    </>
  );
}
