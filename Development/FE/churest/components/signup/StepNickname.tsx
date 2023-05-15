import Image from 'next/image';
import NextBtn from './NextBtn';
import { images } from '@/public/assets/images';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { isCheckedNickname } from '@/apis/mypage';
import Swal from 'sweetalert2';

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
  // 닉네임 중복체크
  const { data, refetch } = useQuery(
    'checkNickName',
    () => isCheckedNickname(nickname),
    {
      onSuccess() {},
    }
  );

  useEffect(() => {
    refetch();
  }, [nickname]);

  // 엔터 감지
  const onKeyPress = (e: any) => {
    if (e.key == 'Enter' || e.key == 13) {
      if (nickname.length == 0 || data?.data) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: '닉네임을 확인해주세요',
          showConfirmButton: false,
          timer: 500,
        });
      } else plusPage();
    }
  };

  return (
    <>
      <div>
        <div className="center img">
          <Image src={images[pickedAvatar]} alt="" width={180} height={320} />
        </div>
        <input
          placeholder="닉네임을 입력해주세요 (최대 6자)"
          className="gray-clay"
          maxLength={6}
          minLength={1}
          value={nickname}
          onChange={(e) => getNickname(e)}
          onKeyUp={onKeyPress}
        />

        <div
          className={
            data?.data && nickname.length != 0
              ? 'show-div check-alert center'
              : 'hidden check-alert center'
          }
        >
          중복된 닉네임입니다
        </div>
        <div className="center">
          {pickedAvatar && !data?.data && nickname.length != 0 ? (
            <NextBtn comment={'NEXT'} type={'show'} logic={plusPage} />
          ) : data?.data || nickname.length == 0 ? (
            <NextBtn comment={'NEXT'} type={'disalbe'} logic={plusPage} />
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
          margin: 50px 0 5px 0;
        }
        input:focus {
          background: rgba(175, 186, 206, 0.11);
          box-shadow: inset -5px -2px 4px #ffffff, inset 3px 3px 10px #bac3df;
          border-radius: 20px;
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
