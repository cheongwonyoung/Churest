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
          <div>
            <div className="inside-circle center">
              <Image
                src={images['avatar_' + avatarId + '_img']}
                alt=""
                width={75}
                height={120}
              />
            </div>
            <div className="nickname-box">
              <div className="center nickname">{nickname}</div>
              <div className='pencil-icon'><BsPencil/></div>
            </div>
          </div>
          <div className="mine">
            <Carousel cardType={cardType} info={treeList}></Carousel>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .mypage-container {
            width: 700px;
            height: 540px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            overflow-x: hidden;
            overflow-y: auto;
            z-index: 50;
          }
          .mine {
            display: grid;
            place-items: center;
            width: 300px;
            height: 320px;
            padding: 10px 0 10px 0;
          }
          .tree-img {
            margin: 0 auto;
          }
          .nickname {
            line-height: 50px;
            font-size: 20px;
          }
          .nickname-box{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem
          }
          .pencil-icon:hover{
            transform:scale(1.3);
            transition: transform .5s;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
