import Image from 'next/image';
import NextBtn from './NextBtn';
import { images } from '@/public/assets/images';
import { useState } from 'react';

type Props = {
  getNickname(i: any): void;
  pickedAvatar: string;
  plusPage(): void;
  nickname: string;
};

export default function StepNickname({
  getNickname,
  pickedAvatar,
  plusPage,
  nickname,
}: Props) {
  console.log('고른 아바타는');
  console.log(pickedAvatar);

  return (
    <>
      <div>
        <div className="center img">
          <Image src={images[pickedAvatar]} alt="" width={180} height={280} />
        </div>
        <input
          placeholder="닉네임을 입력해주세요 (최대 6자)"
          className="inside-clay"
          maxLength={6}
          minLength={1}
          // onChange={(e) => handleName(e)}
          value={nickname}
          onChange={(e) => getNickname(e)}
        />
        <div className="center">
          {pickedAvatar && nickname.length != 0 ? (
            <NextBtn comment={'NEXT'} logic={plusPage} />
          ) : (
            <></>
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
          margin: 50px;
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
        .img {
          animation: flying 1s infinite alternate;
        }
        @keyframes flying {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(0, 15px);
          }
        }
      `}</style>
    </>
  );
}
