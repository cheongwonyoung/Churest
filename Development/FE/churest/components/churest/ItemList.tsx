import Image from 'next/image';
import { images } from '@/public/assets/images';
type Props = {
  showedItem: string;
  handleItems(v: any): void;
};

export default function ItemList({ showedItem, handleItems }: Props) {
  const birdList = ['bird_0', 'bird_1', 'bird_2', 'bird_3', 'bird_4', 'bird_5'];
  const nestList = ['nest_0', 'nest_1', 'nest_2', 'nest_3'];
  const houseList = ['house_0', 'house_1', 'house_2', 'house_3'];

  const itemList = () => {
    const structure = () => {
      switch (showedItem) {
        case '새':
          return birdList;
        case '새집':
          return nestList;
        default:
          return houseList;
      }
    };

    return structure().map((item) => (
      <div
        key={item}
        id={item}
        onClick={() => handleItems(item)}
        style={{ margin: '30px' }}
      >
        {item}
        <Image
          src={images[item + '_img']}
          alt=""
          id={item}
          width={50}
          height={50}
        />
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
