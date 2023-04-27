
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
      <div className="blue-clay" style={{ width: '1000px', height: '350px' }}>
        <div className="">{itemTitle}</div>
        <ItemList showedItem={showedItem} handleItems={handleItems}></ItemList>
        <div className="center">
          <button className="green-btn">저장</button>
        </div>
      </div>
      <style jsx>{`
        .tab-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}
