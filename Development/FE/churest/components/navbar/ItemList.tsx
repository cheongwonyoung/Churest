import Image from 'next/image';
import { images } from '@/public/assets/images';
import { useState } from 'react';
import { useQuery } from 'react-query';
import internal from 'stream';
import { getShopBirdList, getBirdHouseList, getHouseList }  from '@/apis/shop';

type Props = {
  // showedItem: string; // 이걸 애초에 bird, nest, house로 보내면 될 듯 
  haveItem: any;
  // coin:number;
  // memberId: number;
  // handleItems(v: any): void;
};

export default function ItemList({ haveItem }: Props) {
console.log("ItemList " + haveItem); // 2번씩 출력됨


  const itemList = () => {
    // const structure = () => {
    //   if (showedItem == '새'){
    //     return birdList;
    //   }
    //   else if(showedItem =='새집'){
    //       return nestList;
    //   }
    //   else{
    //       return houseList;
    //   }
    // };

    // return haveItem.map((item:any, idx:number) => (
    //   <div
    //     key={item}
    //     id={item}
    //     // onClick={() => handleItems(item)}
    //     style={{ margin: '30px' }}
    //   >
    //     <Image
    //       src={images[item + '_img']}
    //       alt=""
    //       id={item}
    //       width={100}
    //       height={100}
    //     />

    //     {idx} : {item}
    //     {/* {haveItem[idx].isOwn ? (haveItem[idx].name) : (haveItem[idx].price)} */}
    //   </div>
    // ));

    return (
      <>
        {haveItem.map((item:any, idx:number)  =>  (
          
        ))}
      </>
    );


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
