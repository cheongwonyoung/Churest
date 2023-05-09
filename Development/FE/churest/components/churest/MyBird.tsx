import Carousel from '../common/Carousel';
import { getMyBirdsList } from '@/apis/mypage';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function MyBird() {
  const cardType = 'mybird';
  const memberId: number = 1;

  // 나의 새 목록
  const [birdList, setMyBirds] = useState([{}]);
  useQuery('mybirds', () => getMyBirdsList(Number(memberId)), {
    onSuccess(data) {
      console.log("나의 새에요")
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
          <Carousel cardType={cardType} info={birdList}></Carousel>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            width: 400px;
            height: 400px;
          }
          .mine {
            width: 200px;
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
