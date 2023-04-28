import Image from 'next/image';
import birdImg from '@/public/assets/bird_1_img.png';
import Carousel from '../common/Carousel';
import { getMyBirdsList } from '@/apis/mypage';
import { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
// import { useRecoilValue } from 'recoil';
// import { userStatus, userToken } from '../recoil/userAtom';

export default function MyBird() {
  const cardType = 'mybird';
  const memberId = 1;
  console.log(memberId + '번 멤버');
  // 나의 새 목록
  const [birdList, setMyBirds] = useState([{}]);
  useQuery('mybirds', () => getMyBirdsList(Number(memberId)), {
    onSuccess(data) {
      console.log('우히히 나의 새들이다');
      console.log(data.data);
      setMyBirds([...data.data]);
    },
    onError: (error) => {
      console.log('에러다');
      console.log(error);
    },
    staleTime: 60 * 1000,
  });

  return (
    <>
      <div className="blue-clay container center">
        <div className="mine">
          <Carousel cardType={cardType}></Carousel>
        </div>

        {/* <div className="gray-clay mine">
          <Image src={treeImg} alt="" width={200} />

          <p>행복했던 엠지들</p>
          <p>2023.02.21</p>
        </div> */}
      </div>

      <style jsx>
        {`
          .container {
            width: 400px;
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
        `}
      </style>
    </>
  );
}
