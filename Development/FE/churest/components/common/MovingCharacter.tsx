import { useFrame } from '@react-three/fiber';
import { Man1 } from '../3DFiles/Man1';
import { RigidBody } from '@react-three/rapier';
import { useRef, useEffect, useState } from 'react';
import { OrbitControls, useKeyboardControls } from '@react-three/drei';
import { Controls } from '@/pages/garden/[id]';

export default function MovingCharacter() {
  const man1 = useRef<any>();

  const isFloor = useRef(true);

  useEffect(() => {
    man1.current?.setEnabledRotations(false, false, false);
  }, []);

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );

  const jump = () => {
    if (isFloor.current) {
      man1.current.applyImpulse({ x: 0, y: 2, z: 0 });
      console.log(isFloor);

      isFloor.current = false;
    }
  };
  // 캐릭터 이동
  const handleMovement = () => {
    let move = 0.2;
    if (!isFloor.current) {
      move = 0.07;
    }
    if (rightPressed) {
      console.log('gogo');
      man1.current.applyImpulse({ x: move, y: 0, z: 0 });
    }
    if (leftPressed) {
      man1.current.applyImpulse({ x: -move, y: 0, z: 0 });
    }
    if (forwardPressed) {
      man1.current.applyImpulse({ x: 0, y: 0, z: -move });
    }
    if (backPressed) {
      man1.current.applyImpulse({ x: 0, y: 0, z: move });
      console.log('앞');
    }
  };

  //캐릭터 보는 방향
  const handleLookAt = () => {
    if (rightPressed && forwardPressed) {
      setLook((Math.PI * 3) / 4);
    } else if (forwardPressed && leftPressed) {
      setLook((Math.PI * 5) / 4);
    } else if (leftPressed && backPressed) {
      setLook(-Math.PI / 4);
    } else if (backPressed && rightPressed) {
      setLook(Math.PI / 4);
    } else if (rightPressed) {
      setLook(Math.PI / 2);
    } else if (leftPressed) {
      setLook(-Math.PI / 2);
    } else if (forwardPressed) {
      setLook(Math.PI);
    } else if (backPressed) {
      setLook(0);
    }
  };

  const [look, setLook] = useState(0);
  useFrame(() => {
    if (jumpPressed) {
      jump();
    }
    console.log();
    if (man1.current?.translation().y < -5) {
      man1.current.setTranslation({ x: 0, y: 0, z: 0 });
    }
    handleMovement();
    handleLookAt();
  });

  return (
    <>
      <OrbitControls position={[1, 1, 1]} />
      <RigidBody
        ref={man1}
        canSleep={false}
        colliders="cuboid"
        onCollisionEnter={({ other }) => {
          console.log('충돌');

          if (other.rigidBodyObject?.name.includes('floor')) {
            isFloor.current = true;
          }
        }}
        onCollisionExit={({ other }) => {
          console.log('해제');

          if (other.rigidBodyObject?.name.includes('floor')) {
            isFloor.current = false;
          }
        }}
        onIntersectionExit={({ other }) => {
          if (other.rigidBodyObject?.name.includes('floor')) {
            isFloor.current = true;
          }
        }}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject?.name.includes('floor')) {
            isFloor.current = true;
          }
        }}
        rotation={[0, look, 0]}
        friction={2}
      >
        <Man1
          isMoving={
            forwardPressed || backPressed || rightPressed || leftPressed
          }
        />
      </RigidBody>
    </>
  );
}
