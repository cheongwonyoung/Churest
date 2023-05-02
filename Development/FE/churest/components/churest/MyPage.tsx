import Image from 'next/image';
import birdImg from '@/public/assets/bird_1_img.png';
import Carousel from '../common/Carousel';
import { getMyInfo } from '@/apis/mypage';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function MyPage() {
  const cardType = 'mypage';
  const memberId = 1;
  // 나의 새 목록
  const [treeList, setMyPage] = useState([{}]);
  const [nickname, setNickname] = useState('');
  useQuery('mypage', () => getMyInfo(Number(memberId)), {
    onSuccess(data) {
      console.log('마이페이지입니다');
      setMyPage([...data.data.boards]);
      setNickname(data.data.member.nickname);
    },
    onError: (error) => {
      console.log('에러다');
      console.log(error);
    },
    staleTime: 60 * 1000,
  });

  return (
    <>
      <div className="blue-clay container">
        <div>
          <div className="inside-circle center">
            <Image src={birdImg} alt="" width={100} />
          </div>
          <div className="center nickname">{nickname}</div>
        </div>
        <div className="mine">
          <Carousel cardType={cardType} info={treeList}></Carousel>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            place-items: center;
            width: 800px;
            height: 400px;
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
