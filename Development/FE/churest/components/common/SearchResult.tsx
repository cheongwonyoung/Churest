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
            <div className="gray-clay search-avatar">
              <Image
                src={images['avatar_' + item.avatarId + '_img']}
                width={80}
                height={130}
                alt=""
              ></Image>
            </div>
            <div className="nickname">{item.nickname}</div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          gap: 15px;
          margin-bottom: 10px;
        }
        .search-avatar{
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
        }
        .nickname{
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
