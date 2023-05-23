import { Html } from '@react-three/drei';
import { useRouter } from 'next/router';
import { House1 } from '../3DFiles/House/House_1';
import { House2 } from '../3DFiles/House/House_2';
import { House3 } from '../3DFiles/House/House_3';
import { House4 } from '../3DFiles/House/House_4';
import { House5 } from '../3DFiles/House/House_5';
import { images } from '@/public/assets/images';
import Image from 'next/image';
import { Vector3 } from 'three';

type Props = {
  myInfo: MyInfo;
  position: Vector3;
  bubble_position: Vector3;
};

type MyInfo = {
  memberId: number;
  nickname: string;
  houseId: number;
};

export default function ChuWorldHouse({
  myInfo,
  position,
  bubble_position,
}: Props) {
  const router = useRouter();

  const house = () => {
    switch (myInfo.houseId) {
      case 1:
        return <House1 rotation={[0, -0.3, 0]} />;
      case 2:
        return <House2 rotation={[0, -0.3, 0]} />;
      case 3:
        return <House3 rotation={[0, -0.3, 0]} />;
      case 4:
        return <House4 rotation={[0, -0.3, 0]} />;
      case 5:
        return <House5 rotation={[0, -0.3, 0]} />;
      case 6:
        return <House5 rotation={[0, -0.3, 0]} />;
    }
  };

  return (
    <>
      <group
        position={position}
        onClick={() => router.push('/churest/' + myInfo.memberId)}
      >
        <Html position={[0, 5, 0]} zIndexRange={[10, 0]}>
          <div className="text-box">
            <Image
              src={images.chuworld_bubble_img}
              alt=""
              width={300}
              height={280}
              style={{ position: 'absolute' }}
            />
            <p className="text">{myInfo.nickname}</p>
          </div>
        </Html>
        {house()}
      </group>

      <style jsx>{`
        .text-box {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text {
          font-size: 25px;
          font-weight: bold;
          z-index: 5;
        }
      `}</style>
    </>
  );
}
