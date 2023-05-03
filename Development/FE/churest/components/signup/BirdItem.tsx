import Image from 'next/image';
import img from '@/public/assets/bird_1_img.png';

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
  const cn = () => {
    if (Bird === pickedBird) return 'inside-clay';
    return 'gray-clay';
  };

  return (
    <>
      <div id={Bird} className={cn()} onClick={(e) => handlePickedBird(e)}>
        <Image
          src={img}
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
