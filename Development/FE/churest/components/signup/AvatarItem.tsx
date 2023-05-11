import Image from 'next/image';
import { images } from '@/public/assets/images';

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
  // const imgSrc = (i: string): string => {
  //   switch (i) {
  //     case '1':
  //       return 'avatar_1_img';
  //     case '2':
  //       return 'avatar_2_img';
  //     case '3':
  //       return 'avatar_3_img';
  //     case '4':
  //       return 'avatar_4_img';
  //     case '5':
  //       return 'avatar_5_img';
  //     default:
  //       return 'avatar_6_img';
  //   }
  // };

  const clickStyle = () => {
    if (Avatar === pickedAvatar) return 'inside-clay signup-item';
    return 'gray-clay signup-item';
  };

  return (
    <>
      <div
        id={Avatar}
        className={clickStyle()}
        onClick={(e) => handlePickedAvatar(e)}
      >
        <Image
          id={Avatar}
          src={images[Avatar]}
          alt=""
          width={120}
          height={170}
        />
      </div>
      <style jsx>{`
        .signup-item {
          width: 250px;
          height: 300px;
          margin: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
