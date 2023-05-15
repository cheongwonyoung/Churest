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
    if (Bird === pickedBird) return 'yellow-clay-custom signup-item';
    return 'gray-clay signup-item';
  };

  return (
    <>
      <div
        id={Bird}
        className={clickStyle()}
        onClick={(e) => handlePickedBird(e)}
      >
        <Image id={Bird} src={images[Bird]} alt="" width={130} height={120} />
      </div>
      <style jsx>{`
      .signup-item {
          width: 200px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .yellow-clay-custom {
          cursor: pointer;
          border-radius: 20px;
          background: #fff5e0;
          box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1),
            inset 4px 4px 4px 4px #ffffff,
            inset 6px 6px 20px 6px rgba(255, 255, 255, 0.7);
        }
        .signup-item:hover {
          background: rgba(175, 186, 206, 0.11);
          box-shadow: inset -5px -2px 4px #ffffff, inset 3px 3px 10px #bac3df;
          border-radius: 12px;
        }
      `}</style>
    </>
  );
}
