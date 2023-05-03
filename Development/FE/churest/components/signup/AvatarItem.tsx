import Image from 'next/image';
import img from '@/public/assets/bird_1_img.png';

type Props = {
  Avatar: string;
  handlePickedAvatar(i: any): void;
  pickedAvatar: string;
};

// Avatar 카드 디자인
export default function AvatarItem({
  Avatar,
  handlePickedAvatar,
  pickedAvatar,
}: Props) {
  const cn = () => {
    if (Avatar === pickedAvatar) return 'inside-clay';
    return 'gray-clay';
  };

  return (
    <>
      <div id={Avatar} className={cn()} onClick={(e) => handlePickedAvatar(e)}>
        <Image
          src={img}
          alt=""
          width={150}
          height={100}
          onClick={(e) => handlePickedAvatar(e)}
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
