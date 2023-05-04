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
  const imgSrc = (i: string): string => {
    switch (i) {
      case '1':
        return 'bird_1_img';
      case '2':
        return 'bird_2_img';
      case '3':
        return 'bird_3_img';
      case '4':
        return 'bird_4_img';
      case '5':
        return 'bird_5_img';
      default:
        return 'bird_6_img';
    }
  };

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
          src={images[imgSrc(Bird)]}
          alt=""
          width={150}
          height={100}
          onClick={(e) => handlePickedBird(e)}
        />
      </div>
      <style jsx>{`
        div {
          width: 250px;
          height: 300px;
          margin: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .red {
          background: red;
        }
        .blue {
          background: blue;
        }
      `}</style>
    </>
  );
}
