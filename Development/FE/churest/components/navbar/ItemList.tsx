import Image from 'next/image';
import { images } from '@/public/assets/images';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import internal from 'stream';
import {
  getShopBirdList,
  getBirdHouseList,
  getHouseList,
  getNewBird,
  getNewBirdHouse,
  getNewHouse,
  modifyMyBird,
  modifyMyBirdHouse,
  modifyMyHouse,
} from '@/apis/shop';
import { useRecoilState } from 'recoil';
import { openShopAtom, newBirdAtom } from '@/atoms/modal';

type Props = {
  itemCategoryName: string;
  memberId: number;
};

export default function ItemList({ itemCategoryName, memberId }: Props) {
  const [coin, setCoin] = useState(0);

  const [haveBirdItem, setHaveBirdItem] = useState(Array);
  const [haveBirdHouseItem, setHaveBirdHouseItem] = useState(Array);
  const [haveHouseItem, setHaveHouseItem] = useState(Array);

  const [isShopOpen, setIsShopOpen] = useRecoilState(openShopAtom);
  const [isNewBirdOpen, setIsNewBirdOpen] = useRecoilState(newBirdAtom);

  const { refetch: refetchBird } = useQuery(
    'birds',
    () => getShopBirdList(Number(memberId)),
    {
      onSuccess(data) {
        console.log(data.data.birds);
        setHaveBirdItem(data.data.birds);
        setCoin(data.data.coin);
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );

  const { refetch: refetchBirdHouse } = useQuery(
    'birdhouses',
    () => getBirdHouseList(Number(memberId)),
    {
      onSuccess(data) {
        console.log(data.data.birdHouses);
        setHaveBirdHouseItem(data.data.birdHouses);
        setCoin(data.data.coin);
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );

  const { refetch: refetchHouse } = useQuery(
    'houses',
    () => getHouseList(Number(memberId)),
    {
      onSuccess(data) {
        console.log(data.data);
        setHaveHouseItem(data.data.houses);
        setCoin(data.data.coin);
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );
  useEffect(() => {
    refetchBird();
    refetchBirdHouse();
    refetchHouse();
  }, []);

  const buyBird = useMutation(
    (info: { birdId: number; memberId: number }) => getNewBird(info),
    {
      onSuccess: (data) => {
        console.log('새 구입 성공');
        console.log(data.data);

        setIsShopOpen({ isModal: false }); // 상점 창 닫기
        setIsNewBirdOpen({ isModal: true, bird: data.data });
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );

  const buyBirdHouse = useMutation(
    (info: { birdHouseId: number; memberId: number }) => getNewBirdHouse(info),
    {
      onSuccess: (data) => {
        console.log('새 집 구입 성공');
        console.log(data.data);
        refetchBirdHouse();
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );

  const buyHouse = useMutation(
    (info: { houseId: number; memberId: number }) => getNewHouse(info),
    {
      onSuccess: (data) => {
        console.log('집 구입 성공');
        console.log(data.data);
        refetchHouse();
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );

  const modifyBird = useMutation(
    (info: { birdId: number; memberId: number }) => modifyMyBird(info),
    {
      onSuccess: (data) => {
        console.log('새 변경 성공');
        console.log(data.data);
        refetchBird();
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );

  const modifyBirdHouse = useMutation(
    (info: { houseId: number; memberId: number }) => modifyMyBirdHouse(info),
    {
      onSuccess: (data) => {
        console.log('새 집 변경 성공');
        console.log(data.data);
        refetchBirdHouse();
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );

  const modifyHouse = useMutation(
    (info: { houseId: number; memberId: number }) => modifyMyHouse(info),
    {
      onSuccess: (data) => {
        console.log('집 변경 성공');
        console.log(data.data);
        refetchHouse();
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
    }
  );

  const handleItem = (e: any) => {
    if (e.isOwn) {
      if (!e.isUsed) {
        if (confirm(e.name + '으로 변경하시겠습니까?')) {
          switch (itemCategoryName) {
            case 'bird':
              modifyBird.mutate({ birdId: e.id, memberId: memberId });
              break;
            case 'nest':
              modifyBirdHouse.mutate({ houseId: e.id, memberId: memberId });
              break;
            default:
              modifyHouse.mutate({ houseId: e.id, memberId: memberId });
              break;
          }
        } else {
          console.log('변경 취소');
        }
      }
    } else {
      if (coin >= e.price) {
        console.log('살거고 살 수 있음');
        if (confirm(e.name + '를 구매하시겠습니까?')) {
          switch (itemCategoryName) {
            case 'bird':
              buyBird.mutate({ birdId: e.id, memberId: memberId });
              break;
            case 'nest':
              buyBirdHouse.mutate({ birdHouseId: e.id, memberId: memberId });
              break;
            default:
              buyHouse.mutate({ houseId: e.id, memberId: memberId });
              break;
          }
          console.log('구매 완료');
        } else {
          console.log('구매 취소');
        }
      } else {
        alert('잔액이 부족하여 구매할 수 없습니다.');
      }
    }
  };

  const structure = () => {
    if (itemCategoryName == 'bird') {
      console.log(haveBirdItem);
      return haveBirdItem;
    } else if (itemCategoryName == 'nest') {
      return haveBirdHouseItem;
    } else {
      return haveHouseItem;
    }
  };

  const itemList = () => {
    return structure().map((item: any, idx: number) => (
      <div
        key={item.name}
        id={item.name}
        onClick={() => handleItem(item)}
        style={{ margin: '30px' }}
      >
        <Image
          src={images[itemCategoryName + '_' + (idx + 1) + '_img']}
          alt={item.name}
          id={item.name}
          width={100}
          height={100}
          style={{ marginBottom: '20px' }}
        />

        {item.isOwn ? (
          <div className="btn">{item.isUsed ? '착용중' : '교체'}</div>
        ) : (
          <div className="price">
            <Image
              src={images['coin_navbar_img']}
              alt={item.name}
              id={item.name}
              width={30}
              height={30}
              style={{ margin: '0 10px 0 0' }}
            />
            {item.price}
          </div>
        )}

        <style jsx>{`
          .price {
            text-align: center;
            font-weight: bold;
            align-items: center;
            justify-content: center;
            display: flex;
          }
          .btn {
            cursor: pointer;
            border-radius: 205px;
            background: #fff5e0;
            box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1),
              inset 4px 4px 4px 4px #ffffff,
              inset 6px 6px 20px 6px rgba(255, 255, 255, 0.7);
            font-weight: bold;
            height: 40px;
            width: 80px;
            text-align: center;
            align-items: center;
            justify-content: center;
            display: flex;
          }
        `}</style>
      </div>
    ));
  };

  return (
    <>
      <div className="">
        <div className="price">
          <Image
            src={images['coin_navbar_img']}
            alt=""
            width={30}
            height={30}
            style={{ margin: '0 10px 0 0' }}
          />
          {coin}
        </div>

        <div className="item-grid">{itemList()}</div>
      </div>
      <style jsx>{`
        .item-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          place-items: center;
        }
        .price {
          text-align: center;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          display: flex;
        }
      `}</style>
    </>
  );
}
