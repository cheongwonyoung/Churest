import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import ItemList from './ItemList';
import { getShopBirdList, getBirdHouseList, getHouseList }  from '@/apis/shop';


// type Props = {
//   handleItems(v: any): void;
// };

export default function ItemShop({}) {
  const memberId = 1;
  const itemNames: string[] = ['새', '새집', '집'];
  const [showedItem, setShowedItem] = useState('새');

  //  누를 때마다가 아니라 맨 처음에 useQuery로 다 가져오기?
  // const [haveItem, setHaveItem] = useState({});

  // const shopBirdList = useMutation(
  //   () => getShopBirdList(memberId),
  //   {
  //     onSuccess:(data) => {
  //       console.log("새 목록 가져오기 성공");
  //       console.log(data.data.birds);
  //       setHaveItem(data.data.birds);
  //     },
  //     onError: (error) => {
  //       console.log('에러다');
  //       console.log(error);
  //     }
  //   }
  // );

  // const shopBirdHouseList = useMutation(
  //   () => getBirdHouseList(memberId),
  //   {
  //     onSuccess:(data) => {
  //       console.log("새 집 목록 가져오기 성공");
  //       console.log(data.data.birdHouses);
  //       setHaveItem(data.data.birdHouses);
  //     },
  //     onError: (error) => {
  //       console.log('에러다');
  //       console.log(error);
  //     }
  //   }
  // );

  // const shopHouseList = useMutation(
  //   () => getHouseList(memberId),
  //   {
  //     onSuccess:(data) => {
  //       console.log("집 목록 가져오기 성공");
  //       console.log(data.data.houses);
  //       setHaveItem(data.data.houses);
  //     },
  //     onError: (error) => {
  //       console.log('에러다');
  //       console.log(error);
  //     }
  //   }
  // );

  const handleShowedItem = (e: any) => {
    console.log("-----------");
    switch (e.target.id) {
      case '새':
        // shopBirdList.mutate();
        console.log("새");
        break;
      case '새집':
        // shopBirdHouseList.mutate();
        console.log("새집");
        break;
      default:
        console.log("집")
        // shopHouseList.mutate();
        break;
    }
    setShowedItem(e.target.id);
  };

  const itemTitle = (
    <div className="tab-container">
      {itemNames.map((item) => (
        <div
          // className={titleColor(item)}
          className="yellow-clay"
          id={item}
          onClick={(e) => handleShowedItem(e)}
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="blue-clay" style={{ width: '1000px' }}>
        <div className="">{itemTitle}</div>
        <ItemList showedItem={showedItem} ></ItemList>
        <div className="center" style={{ margin: '20px 0 20px 0' }}>
          <button className="green-btn">저장</button>
        </div>
      </div>
      <style jsx>{`
        .tab-container {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
