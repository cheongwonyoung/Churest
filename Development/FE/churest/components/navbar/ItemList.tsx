import Image from 'next/image';
import { images } from '@/public/assets/images';
import { useState } from 'react';
import { useQuery } from 'react-query';
import internal from 'stream';
import { getShopBirdList, getBirdHouseList, getHouseList }  from '@/apis/shop';

type Props = {
  showedItem: string;
  // haveItem: any;
  // memberId: number;
  // handleItems(v: any): void;
};

export default function ItemList({ showedItem }: Props) {
console.log("ItemList " + showedItem);
  const birdList = ['bird_0', 'bird_1', 'bird_2', 'bird_3', 'bird_4', 'bird_5'];
  const nestList = ['nest_0', 'nest_1'];
  const houseList = ['house_0', 'house_1'];

  const itemList = () => {
    const structure = () => {
      if (showedItem == '새'){
        return birdList;
      }
      else if(showedItem =='새집'){
          return nestList;
      }
      else{
          return houseList;
      }
    };

    return structure().map((item:any, idx:number) => (
      <div
        key={item}
        id={item}
        // onClick={() => handleItems(item)}
        style={{ margin: '30px' }}
      >
        <Image
          src={images[item + '_img']}
          alt=""
          id={item}
          width={100}
          height={100}
        />

        {idx} : {item}
        {/* {haveItem[idx].isOwn ? (haveItem[idx].name) : (haveItem[idx].price)} */}
      </div>
    ));

  };

  return (
    <>
      <div className="">
        <div className="item-grid">{itemList()}</div>
      </div>
      <style jsx>{`
        .item-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          place-items: center;
        }
      `}</style>
    </>
  );
}
