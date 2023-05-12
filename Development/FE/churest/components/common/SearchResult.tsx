import Image from 'next/image';
import { useRouter } from 'next/router';
import { images } from '@/public/assets/images';
import { useRecoilState, useRecoilValue } from 'recoil';
import { openSearchAtom } from '@/atoms/modal';

type Props = {
  list: ResultType[];
};

interface ResultType {
  memberId: number;
  avatarId: number;
  nickname: string;
}
export default function SearchFriend({ list }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const router = useRouter();

  return (
    <>
      {list.map((item: ResultType, idx: number) => (
        <div key={idx}>
          <div
            className="container"
            onClick={() => {
              setIsSearchOpen({ isModal: false });
              router.push('/churest/' + item.memberId) 
            }}
          >
            <div className="gray-clay search-avatar">
              <Image
                src={images['avatar_' + item.avatarId + '_img']}
                width={65}
                height={110}
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
        .container:hover{
          transform: scale(0.9);
          transition: transform 0.3s;
          cursor: pointer;
        }
        .search-avatar {
          width: 70px;
          height: 70px;
          display: flex;
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
        }
        .nickname {
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
