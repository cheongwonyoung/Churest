import Image from 'next/image';
import { images } from '@/public/assets/images';
import Carousel from '../common/Carousel';
import { getMyInfo } from '@/apis/mypage';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { openMyPageAtom } from '@/atoms/modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import { useRouter } from 'next/router';
import NickName from './NickName';

type MyPageInfo = {
  member: { memberId: number; nickname: string; avatarId: number };
  boards: [];
};

export default function MyPage() {
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom);
  const closeModal = () => {
    setIsMyPageOpen({ isModal: false });
  };

  const cardType = 'mypage';
  let memberId = useRecoilValue(loginAtom).id;

  // 방문 츄레스트 id
  const router = useRouter();
  const churestId: number = Number(router.query.id);

  if (churestId == useRecoilValue(loginAtom).id) {
    memberId = churestId;
  }

  const { data, refetch } = useQuery(
    'mypage',
    () => getMyInfo(Number(memberId)),
    {
      onSuccess(data) {
        console.log(data.data);
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );

  useEffect(() => {
    refetch();
    console.log('처음');
  }, []);

  return (
    <>
      <div>
        {/* {isMyPageOpen.isModal && <ModalBlackBg closeModal={closeModal} />} */}
        <div className="blue-clay mypage-container">
          <div className="modal-title">My Page</div>
          <div className="mypage-content-box">
            <div className="avatar-box">
              {/* <div className="inside-circle center"> */}
              <div className="center">
                <Image
                  src={images['avatar_' + data?.data.member.avatarId + '_img']}
                  alt=""
                  width={100}
                  height={160}
                />
              </div>
              <div className="nickname-box">
                <NickName
                  nickname={data?.data.member && data.data.member.nickname}
                  refetch={refetch}
                ></NickName>
              </div>
            </div>
            <div className="mine">
              {data?.data.boards.length == 0 ? (
                <div className="alarm-text">
                  <p>
                    추억이 아직 없습니다.<br></br>츄리를 심어보세요!
                  </p>
                </div>
              ) : (
                <div>
                  <div className="memory-title">추억 모아보기</div>
                  <Carousel
                    cardType={cardType}
                    info={data?.data.boards && data.data.boards}
                  ></Carousel>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .mypage-container {
            width: 600px;
            height: 460px;
            overflow-x: hidden;
            overflow-y: auto;
            z-index: 50;
          }
          .mine {
            justify-content: center;
            align-items: center;
          }
          .tree-img {
            margin: 0 auto;
          }
          .memory-title {
            text-align: center;
            line-height: 50px;
            font-size: 18px;
            font-weight: bold;
          }
          .mypage-content-box {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 100px;
          }
          .nickname-box {
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-top: 30px;
          }
          .avatar-box {
            margin-top: 30px;
          }
          .alarm-text {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 20px;
            line-height: 40px;
            color: gray;
          }
        `}
      </style>
    </>
  );
}
