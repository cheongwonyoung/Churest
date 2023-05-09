import Image from 'next/image';

import { images } from '@/public/assets/images';

type Props = {
  list: ResultType[];
};

interface ResultType {
  memberId: number;
  avatarId: number;
  nickname: string;
}
export default function SearchFriend({ list }: Props) {
  const handleClick = (id: number) => {
    console.log(id + '숲으로 이동');
  };

  return (
    <>
      {list.map((item: ResultType, idx: number) => (
        <div key={idx}>
          <div className="container">
            <div className="gray-clay">
              <Image
                src={images['avatar_' + item.avatarId + '_img']}
                width={65}
                height={95}
                alt=""
              ></Image>
            </div>
            <div>{item.nickname}</div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      `}</style>
    </>
  );
}
