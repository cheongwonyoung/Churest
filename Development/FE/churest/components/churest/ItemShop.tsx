import { useState } from 'react';
import ItemList from './ItemList';

type Props = {
  handleItems(v: any): void;
};

export default function ItemShop({ handleItems }: Props) {
  const itemNames: string[] = ['새', '새집', '집'];
  const [showedItem, setShowedItem] = useState('새');
  const handleShowedItem = (e: any) => {
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
        <ItemList showedItem={showedItem} handleItems={handleItems}></ItemList>
        <div className="center" style={{ margin: '20px 0 20px 0' }}>
          <button className="green-btn">저장</button>
        </div>
      </div>
      <style jsx>{`
        .tab-container {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          // display: grid;
          // grid-template-columns: 1fr 1fr 1fr;
          // place-items: center;
        }
      `}</style>
    </>
  );
}
