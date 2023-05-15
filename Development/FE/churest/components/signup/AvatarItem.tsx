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
    if (Avatar === pickedAvatar) return 'yellow-clay-custom signup-item';
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
          width={100}
          height={180}
        />
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
