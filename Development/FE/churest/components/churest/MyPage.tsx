import Image from 'next/image';
import { images } from '@/public/assets/images';
import Carousel from '../common/Carousel';
import { getMyInfo } from '@/apis/mypage';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ModalBlackBg from '../common/ModalBlackBg';
import { openMyPageAtom } from '@/atoms/modal';
import { useRecoilState } from 'recoil';
import {BsPencil} from 'react-icons/bs';
export default function MyPage() {
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom);
  const closeModal = () => {
    setIsMyPageOpen({ isModal: false });
  };

  const cardType = 'mypage';
  const memberId = 1;
  // 나의 새 목록
  const [treeList, setMyPage] = useState([{}]);
  const [nickname, setNickname] = useState('');
  const [avatarId, setAvatarId] = useState(0);
  useQuery('mypage', () => getMyInfo(Number(memberId)), {
    onSuccess(data) {
      setMyPage([...data.data.boards]);
      setNickname(data.data.member.nickname);
      setAvatarId(data.data.member.avatarId);
    },
    onError: (error) => {
      console.log('에러다');
      console.log(error);
    },
    staleTime: 60 * 1000,
  });

  return (
    <>
      <div>
        {/* {isMyPageOpen.isModal && <ModalBlackBg closeModal={closeModal} />} */}
        <div className="blue-clay mypage-container">
          <div className="mypage-title">My Page</div>
          <div className="mypage-content-box">
            <div className="avatar-box">
              {/* <div className="inside-circle center"> */}
              <div className="center">
                <Image
                  src={images['avatar_' + avatarId + '_img']}
                  alt=""
                  width={120}
                  height={180}
                />
              </div>
              <div className="nickname-box">
                <div className="center nickname">{nickname}</div>
                <div className='pencil-icon'>정보 수정하기 <BsPencil/></div>
              </div>
            </div>
            <div className="mine">
              <div className="memory-title">추억 모아보기</div>
              <Carousel cardType={cardType} info={treeList}></Carousel>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .mypage-container {
            width: 750px;
            height: 540px;
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
          .nickname {
            line-height: 50px;
            font-size: 25px;
            font-weight: bold;
          }
          .nickname-box{
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-top: 40px;
          }
          .pencil-icon{
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          .pencil-icon:hover{
            transform:scale(1.1);
            transition: transform .5s;
            cursor: pointer;
          }
          .memory-title{
            text-align: center;
            line-height: 60px;
            font-size: 20px;
            font-weight: bold;
          }
          .mypage-title{
            text-align: center;
            line-height: 70px;
            font-size: 30px;
            font-weight: bold;
          }
          .mypage-content-box{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 100px;
          }
          .avatar-box{
            margin-top: 40px;
          }
        `}
      </style>
    </>
  );
}
