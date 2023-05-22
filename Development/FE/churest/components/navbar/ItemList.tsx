import Image from 'next/image';
import { images } from '@/public/assets/images';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
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
import { useRecoilState, useSetRecoilState } from 'recoil';
import { openShopAtom, newBirdAtom } from '@/atoms/modal';
import Swal from 'sweetalert2';
import { loginAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';
import { forestAtom } from '@/atoms/inp';

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

  const setTiming = useSetRecoilState(forestAtom);
  const getForestInfo = () => {
    setTiming((prev) => !prev);
  };

  const { refetch: refetchBird } = useQuery(
    'birds',
    () => getShopBirdList(Number(memberId)),
    {
      onSuccess(data) {
        setHaveBirdItem(data.data.birds);
        setCoin(data.data.coin);
      },
      onError: (error) => {},
    }
  );

  const { refetch: refetchBirdHouse } = useQuery(
    'birdhouses',
    () => getBirdHouseList(Number(memberId)),
    {
      onSuccess(data) {
        setHaveBirdHouseItem(data.data.birdHouses);
        setCoin(data.data.coin);
      },
      onError: (error) => {},
    }
  );

  const { refetch: refetchHouse } = useQuery(
    'houses',
    () => getHouseList(Number(memberId)),
    {
      onSuccess(data) {
        setHaveHouseItem(data.data.houses);
        setCoin(data.data.coin);
      },
      onError: (error) => {},
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
        setIsShopOpen({ isModal: false }); // 상점 창 닫기
        setIsNewBirdOpen({ isModal: true, bird: data.data });
      },
      onError: (error) => {},
    }
  );

  const buyBirdHouse = useMutation(
    (info: { birdHouseId: number; memberId: number }) => getNewBirdHouse(info),
    {
      onSuccess: (data) => {
        refetchBirdHouse();
      },
      onError: (error) => {},
    }
  );

  const buyHouse = useMutation(
    (info: { houseId: number; memberId: number }) => getNewHouse(info),
    {
      onSuccess: (data) => {
        refetchHouse();
      },
      onError: (error) => {},
    }
  );

  const modifyBird = useMutation(
    (info: { birdId: number; memberId: number }) => modifyMyBird(info),
    {
      onSuccess: (data) => {
        getForestInfo();
        refetchBird();
      },
      onError: (error) => {},
    }
  );

  const modifyBirdHouse = useMutation(
    (info: { houseId: number; memberId: number }) => modifyMyBirdHouse(info),
    {
      onSuccess: (data) => {
        getForestInfo();
        refetchBirdHouse();
      },
      onError: (error) => {},
    }
  );

  const modifyHouse = useMutation(
    (info: { houseId: number; memberId: number }) => modifyMyHouse(info),
    {
      onSuccess: (data) => {
        getForestInfo();
        refetchHouse();
      },
      onError: (error) => {},
    }
  );

  const handleItem = (e: any) => {
    if (e.isOwn) {
      if (!e.isUsed) {
        let msg;

        if (itemCategoryName == 'bird') {
          msg = e.name + '로 변경하시겠습니까?';
        } else {
          msg = e.name + '으로 변경하시겠습니까?';
        }

        Swal.fire({
          title: msg,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#51da93',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
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
          }
        });
      }
    } else {
      if (coin >= e.price) {
        let name = '';
        if (itemCategoryName == 'bird') {
          name = e.name + '를 구매하시겠습니까?';
        } else {
          name = e.name + '을 구매하시겠습니까?';
        }
        Swal.fire({
          title: name,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#51da93',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
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
          } else {
          }
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '잔액이 부족하여 구매할 수 없습니다.',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
  };

  const structure = () => {
    if (itemCategoryName == 'bird') {
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
        className="item-box"
      >
        <Image
          src={images[itemCategoryName + '_' + (idx + 1) + '_img']}
          alt={item.name}
          id={item.name}
          width={70}
          height={90}
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
          .item-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
          }
          .item-box:hover {
            transform: scale(1.05);
            transition: transform 0.3s;
            cursor: pointer;
          }
          .btn {
            cursor: pointer;
            border-radius: 205px;
            background: #fff5e0;
            box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1),
              inset 4px 4px 4px 4px #ffffff,
              inset 6px 6px 20px 6px rgba(255, 255, 255, 0.7);
            font-weight: bold;
            height: 30px;
            width: 100px;
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
      <div className="container">
        <div className="price">
          <Image
            src={images['coin_navbar_img']}
            alt=""
            width={40}
            height={40}
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
          row-gap: 15px;
          column-gap: 60px;
        }
        .price {
          text-align: center;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          display: flex;
          position: absolute;
          top: -70px;
          left: -70px;
          font-size: 20px;
          gap: 10px;
        }
        .container {
          min-height: 270px;
          margin-left: 100px;
          margin-right: 100px;
          position: relative;
        }
      `}</style>
    </>
  );
}
