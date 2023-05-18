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
          gap: 5px;
        }
        .category-btn {
          cursor: pointer;
          border-radius: 50%;
          background: #fff5e0;
          box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1),
            inset 4px 4px 4px 4px #ffffff,
            inset 6px 6px 20px 6px rgba(255, 255, 255, 0.7);
          font-size: 35px;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .category-btn:hover {
          cursor: pointer;
          background: rgba(175, 186, 206, 0.11);
          box-shadow: inset -5px -2px 4px #ffffff, inset 3px 3px 10px #bac3df;
        }
      `}</style>
    </div>
  );

  return (
    <>
      <div className="blue-clay">
        <div className="tap-container">{itemTitle}</div>
        <ItemList
          itemCategoryName={itemCategoryName}
          memberId={memberId}
        ></ItemList>
        <div className="center bottom">
          <button className="green-btn" onClick={clickSaveButton}>
            닫기
          </button>
        </div>
      </div>
      <style jsx>{`
        .tap-container {
          display: flex;
          justify-content: center;
          margin-top: 5px;
          margin-bottom: 20px;
        }
        .bottom {
          margin-top: 40px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
