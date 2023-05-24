import Image from 'next/image';
import NextBtn from './NextBtn';
import { images } from '@/public/assets/images';
import { useEffect } from 'react';
import { isCheckedBirdNickname } from '@/apis/mypage';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { loginAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';

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
  const token = useRecoilValue(loginAtom).accessToken;
  const { data, refetch } = useQuery(
    'checkNickName',
    () => isCheckedBirdNickname(token, birdname),
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
          className="gray-clay"
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
