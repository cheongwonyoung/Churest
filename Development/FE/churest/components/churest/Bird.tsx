import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { Birds } from './Options';
import { useEffect, useRef, useState } from 'react';

type Props = {
  id: number;
};
export default function Bird({ id }: Props) {
  function randomNum(min: number, max: number) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
  }
  const bird: any = useRef();

  const setLookAt = (x: number, z: number) => {
    if (x > 0) {
      if (z > 0) {
        setLook(Math.PI / 4);
      } else if (z < 0) {
        setLook((Math.PI * 3) / 4);
      } else {
        setLook(Math.PI / 2);
      }
    } else if (x < 0) {
      if (z > 0) {
        setLook(-Math.PI / 4);
      } else if (z < 0) {
        setLook((Math.PI * 5) / 4);
      } else {
        setLook(-Math.PI / 2);
      }
    } else {
      if (z > 0) {
        setLook(0);
      } else if (z < 0) {
        setLook(Math.PI);
      }
    }
  };

  const resetPosition = () => {
    if (bird.current?.translation().y < -10) {
      bird.current?.setTranslation({ x: 0, y: 8, z: 4 });
    }
  };

  useEffect(() => {
    setInterval(() => {
      const x = randomNum(-2, 2);

      const z = randomNum(-2, 2);
      const y = randomNum(2, 4);
      bird.current?.applyImpulse({
        x: x,
        y: y,
        z: z,
      });
      setLookAt(x, z);
      resetPosition();
    }, 2000);
  }, []);

  const [look, setLook] = useState(0);
  return (
    <RigidBody
      position={[4.5, 8, 5.5]}
      colliders="cuboid"
      canSleep={false}
      enabledRotations={[false, false, false]}
      ref={bird}
      rotation={[0, look, 0]}
    >
      {Birds(id)}
    </RigidBody>
  );
}
