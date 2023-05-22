import { RigidBody } from '@react-three/rapier';
import { Birds } from '../churest/Options';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type Props = {
  finish: boolean;
  startNum: number;
};
export default function BirdGame1({ finish, startNum }: Props) {
  const bird: any = useRef();
  useFrame(() => {
    if (startNum < 1) {
      bird.current.setLinvel({ x: 20, y: 0, z: 0 });
    }
  });
  useEffect(() => {
    bird.current.setTranslation({ x: 0, y: 0, z: -1 });
    bird.current.setLinvel({ x: 0, y: 0, z: 0 });
  }, [finish]);

  return (
    <RigidBody
      position={[0, 1, -1]}
      colliders="ball"
      name="bird"
      canSleep={false}
      enabledRotations={[false, false, false]}
      ref={bird}
      rotation={[0, Math.PI / 2, 0]}
    >
      {Birds(7)}
    </RigidBody>
  );
}
