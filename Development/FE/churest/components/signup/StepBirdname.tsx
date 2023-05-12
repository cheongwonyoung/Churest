import Image from 'next/image';
import NextBtn from './NextBtn';
import { images } from '@/public/assets/images';
import { useState } from 'react';

type Props = {
  handlePickedBird(i: any): void;
  pickedBird: string;
  plusPage(): void;
  signUpSubmit(): void;
  getBirdname(i: any): void;
  birdname: string;
};

export default function StepBirdname({
  handlePickedBird,
  getBirdname,
  signUpSubmit,
  pickedBird,
  birdname,
}: Props) {
  console.log('고른 새는');
  console.log(pickedBird);

  return (
    <>
      <div>
        <div className="center img">
          <Image src={images[pickedBird]} alt="" width={280} height={270} />
        </div>
        <input
          placeholder="새의 이름을 입력해주세요 (최대 6자)"
          className="inside-clay"
          value={birdname}
          onChange={(e) => getBirdname(e)}
          maxLength={6}
          minLength={1}
        />
        <div className="center">앙녕 ????????????????</div>
        <div className="center">
          {pickedBird && birdname.length != 0 ? (
            <NextBtn comment={"LET'S GO "} logic={signUpSubmit} />
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
          margin: 30px;
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
