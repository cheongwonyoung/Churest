import Image from 'next/image';
import { images } from '@/public/assets/images';

type Props = {
  Bird: string;
  handlePickedBird(i: any): void;
  pickedBird: string;
};

// Bird 카드 디자인
export default function BirdItem({
  Bird,
  handlePickedBird,
  pickedBird,
}: Props) {
  const clickStyle = () => {
    if (Bird === pickedBird) return 'inside-clay';
    return 'gray-clay';
  };

  return (
    <>
      <div
        id={Bird}
        className={clickStyle()}
        onClick={(e) => handlePickedBird(e)}
      >
        <Image
          src={images[Bird]}
          alt=""
          width={130}
          height={110}
          onClick={(e) => handlePickedBird(e)}
        />
      </div>
      <style jsx>{`
        div {
          width: 220px;
          height: 280px;
          margin: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: ani 1s infinite alternate;
        }
      `}</style>
    </>
  );
}
