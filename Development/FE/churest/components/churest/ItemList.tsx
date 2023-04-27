
import Image from 'next/image';
import { images } from '@/public/assets/images';
type Props = {
  showedItem: string;
  handleItems(v: any): void;
};

export default function ItemList({ showedItem, handleItems }: Props) {
  const birdList = ['bird_0', 'bird_1', 'bird_2', 'bird_3'];
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
      <div key={item} id={item} onClick={() => handleItems(item)} className="">
        멀바용{item}
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
        <div className="">{itemList()}</div>
      </div>
      <style jsx>{`
        .tab {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}
