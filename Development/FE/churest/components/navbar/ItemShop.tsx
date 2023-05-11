import { useState } from 'react';
import { openShopAtom } from '@/atoms/modal';
import { useRecoilState } from 'recoil';
import { BsHouseDoorFill } from 'react-icons/bs';
import { FaKiwiBird } from 'react-icons/fa';
import { GiNestBirds } from 'react-icons/gi';
import ItemList from './ItemList';

type Props = {
  memberId: number;
};

export default function ItemShop({ memberId }: Props) {
  const itemNames: string[] = ['bird', 'nest', 'house'];
  const [itemCategoryName, setItemCategoryName] = useState('bird');

  const [isShopOpen, setIsShopOpen] = useRecoilState(openShopAtom);

  const clickSaveButton = () => {
    setIsShopOpen({ isModal: false });
  };

  const handleShowedItem = (item: any) => {
    console.log(item);
    setItemCategoryName(item);
  };

  const itemTitle = (
    <div className="tab-container">
      {itemNames.map((item) => (
        <div
          // className={titleColor(item)}
          className="category-btn"
          id={item}
          onClick={() => handleShowedItem(item)}
          key={item}
        >
          {item == 'bird' ? (
            <FaKiwiBird />
          ) : item == 'nest' ? (
            <GiNestBirds />
          ) : (
            <BsHouseDoorFill />
          )}
        </div>
      ))}
      <style jsx>{`
        .tab-container {
          display: flex;
          justify-content: space-between;
          text-align: center;
          width: 300px;
        }
        .category-btn {
          cursor: pointer;
          border-radius: 50%;
          background: #fff5e0;
          box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1),
            inset 4px 4px 4px 4px #ffffff,
            inset 6px 6px 20px 6px rgba(255, 255, 255, 0.7);
          font-size: 40px;
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      `}</style>
    </div>
  );

  return (
    <>
      <div className="blue-clay" style={{ width: '1000px' }}>
        <div className="item-container">{itemTitle}</div>
        <ItemList
          itemCategoryName={itemCategoryName}
          memberId={memberId}
        ></ItemList>
        <div className="center" style={{ margin: '20px 0 20px 0' }}>
          <button className="green-btn" onClick={clickSaveButton}>
            닫기
          </button>
        </div>
      </div>
      <style jsx>{`
        .item-container {
          display: flex;
          justify-content: center;
          margin: 20px;
        }
      `}</style>
    </>
  );
}
