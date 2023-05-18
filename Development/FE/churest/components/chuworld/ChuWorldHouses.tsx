import { useThree } from '@react-three/fiber';
import ChuWorldHouse from './ChuWorldHouse';
import * as THREE from 'three';
type MyInfo = {
  memberId: number;
  nickname: string;
  houseId: number;
};
type Props = {
  data: any;
  xPosition: number;
};
export default function ChuWorldHouses({ data, xPosition }: Props) {
  const { width } = useThree((state) => state.viewport);

  return (
    <>
      {data?.map((myInfo: MyInfo, index: number) => (
        <ChuWorldHouse
          myInfo={myInfo}
          key={myInfo.memberId}
          position={new THREE.Vector3(index * 8 - xPosition, -2, 0)}
          bubble_position={new THREE.Vector3(index * 8, 3, 0)}
        />
      ))}
    </>
  );
}
