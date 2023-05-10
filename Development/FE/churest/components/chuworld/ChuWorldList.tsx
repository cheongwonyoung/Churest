import ChuWorldHouse from './ChuWorldHouse';
import { Canvas, useThree } from '@react-three/fiber';
import ChuWorldLight from './ChuWorldLight';
import { ScrollControls } from '@react-three/drei';
import { Scroll } from '@react-three/drei';
import * as THREE from 'three';

type MyInfo = {
  memberId: number;
  nickname: string;
  houseId: number;
};
type Props = {
  data: any;
};
function Houses({ data }: any) {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      {data?.map((myInfo: MyInfo, index: number) => (
        <ChuWorldHouse
          myInfo={myInfo}
          key={myInfo.memberId}
          position={new THREE.Vector3(width * index - 1, -2, 0)}
          bubble_position={new THREE.Vector3(width * index - 1, 3, 0)}
        />
      ))}
    </>
  );
}
export default function ChuWorldList({ data }: Props) {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.3} />
        <ScrollControls horizontal={true} pages={5} distance={1}>
          <Scroll>
            <Houses data={data} />
          </Scroll>
        </ScrollControls>
        <ChuWorldLight />
      </Canvas>
    </>
  );
}
