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
  // console.log('고른 아바타는');
  // console.log(pickedAvatar);

  // const [checkName, setCheckName] = useState(false);
  const { data, refetch } = useQuery(
    'checkNickName',
    () => isCheckedNickname(nickname),
    {
      onSuccess() {
        // console.log();
        // setCheckName(data.data);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [nickname]);

  // 엔터 감지
  const onKeyPress = (e: any) => {
    if (e.key == 'Enter') {
      if (nickname.length == 0 || data?.data)
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: '닉네임을 확인해주세요',
          showConfirmButton: false,
          timer: 500,
        });
    }
  };

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
          onKeyPress={onKeyPress}
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
        {pickedAvatar && !data?.data && nickname.length != 0 ? (
          <div className="center hidden">
            <NextBtn comment={'NEXT'} logic={plusPage} />
          </div>
        ) : data?.data || nickname.length == 0 ? (
          <div className="center">
            <div className="disable-btn center">
              <p>NEXT</p>
            </div>
          </div>
        ) : (
          <></>
        )}
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
