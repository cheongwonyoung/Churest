import Carousel from '../common/Carousel';
import { getMyBirdsList } from '@/apis/mypage';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { loginAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyBird() {
  const cardType = 'mybird';
  const router = useRouter();
  const memberId: number = Number(router.query.id);

  // 나의 새 목록
  const [birdList, setMyBirds] = useState([{}]);
  const { data, isLoading, isError, refetch } = useQuery(
    'mybirds',
    () => getMyBirdsList(Number(memberId)),
    {
      onSuccess(data) {
        setMyBirds([...data.data]);
      },
      onError: (error) => {
        console.log(error);
      },
      staleTime: 60 * 1000,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="blue-clay container center">
        <div>
          <Carousel
            cardType={cardType}
            info={birdList}
            refetch={refetch}
          ></Carousel>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            width: 600px;
            height: 400px;
          }
        `}
      </style>
    </>
  );
}
