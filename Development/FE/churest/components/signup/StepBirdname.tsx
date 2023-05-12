import Image from 'next/image';
import NextBtn from './NextBtn';
import { images } from '@/public/assets/images';
import { useEffect, useState } from 'react';
import { isCheckedBirdNickname } from '@/apis/mypage';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

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
  const { data, refetch } = useQuery(
    'checkNickName',
    () => isCheckedBirdNickname(birdname),
    {
      onSuccess() {},
    }
  );

  useEffect(() => {
    refetch();
  }, [birdname]);

  // 엔터 감지
  const onKeyPress = (e: any) => {
    if (e.key == 'Enter' || e.key == 13) {
      if (birdname.length == 0 || data?.data) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: '닉네임을 확인해주세요',
          showConfirmButton: false,
          timer: 500,
        });
      } else signUpSubmit();
    }
  };
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
          maxLength={6}
          minLength={1}
          onChange={(e) => getBirdname(e)}
          onKeyUp={onKeyPress}
        />

        <div
          className={
            data?.data && birdname.length != 0
              ? 'show-div check-alert center'
              : 'hidden check-alert center'
          }
        >
          중복된 닉네임입니다
        </div>
        <div className="center">
          {pickedBird && !data?.data && birdname.length != 0 ? (
            <NextBtn comment={"LET'S GO"} type={'show'} logic={signUpSubmit} />
          ) : data?.data || birdname.length == 0 ? (
            <NextBtn
              comment={"LET'S GO"}
              type={'disalbe'}
              logic={signUpSubmit}
            />
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
        .check-alert {
          color: red;
          height: 50px;
        }
        .show-div {
          visibility: visible;
        }
        .hidden {
          visibility: hidden;
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
