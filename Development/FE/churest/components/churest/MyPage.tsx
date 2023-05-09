import Image from 'next/image';
import { images } from '@/public/assets/images';
import Carousel from '../common/Carousel';
import { getMyInfo } from '@/apis/mypage';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ModalBlackBg from '../common/ModalBlackBg';
import { openMyPageAtom } from '@/atoms/modal';
import { useRecoilState } from 'recoil';
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
      <div className="gogo">
        {isMyPageOpen.isModal && <ModalBlackBg closeModal={closeModal} />}
        <div className="blue-clay container">
          <div>
            <div className="inside-circle center">
              <Image src={images.bird_1_img} alt="" width={100} height={100} />
            </div>
            <div className="center nickname">{nickname}</div>
          </div>
          <div className="mine">
            <Carousel cardType={cardType} info={treeList}></Carousel>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .gogo {
            width: 100vw;
            height: 100vh;
          }
          .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            place-items: center;
            width: 800px;
            height: 400px;
            overflow-x: hidden;
            overflow-y: auto;
            position: fixed;
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
          }
        `}
      </style>
    </>
  );
}
