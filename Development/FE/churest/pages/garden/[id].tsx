import { Man1 } from '@/components/3DFiles/Man1';
import {
  Box,
  KeyboardControls,
  OrbitControls,
  useKeyboardControls,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import MovingCharacter from '@/components/common/MovingCharacter';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

export default function Garden() {
  // const walkRun = (e: any) => {
  //   e.shiftKey ? run.play() : walk.play();
  // };
  // useEffect(() => {
  //   window.addEventListener('keydown', (e) => move(e));
  //   // man1.current?.setEnabledRotations(false, false, false);
  //   man1.current?.setRotation({ w: 1.0, x: 0.0, y: 0.0, z: 0.0 }, true);
  // }, []);

  // const move = (e: any) => {
  //   const direction = e.code;
  //   // console.log(e);
  //   man1.current.setRotation({ w: 1, x: 0, y: 0, z: 0 });

  //   switch (direction) {
  //     case 'ArrowDown':
  //       // setCharX((prev) => prev + 1);
  //       // setLookAt([0, Math.PI / 2, 0]);
  //       man1.current.applyImpulse({ x: 0, y: 0, z: 0.1 });
  //       // man1.current.addForce({ x: 0, y: 0, z: 0.2 });
  //       // man1.current.setTranslation(0.0, 1.0, 1.0);

  //       // walkRun(e);
  //       break;
  //     case 'ArrowUp':
  //       // setCharX((prev) => prev - 1);
  //       // setLookAt([0, -Math.PI / 2, 0]);
  //       // walkRun(e);
  //       man1.current.applyImpulse({ x: 0, y: 0, z: -0.2 });

  //       break;
  //     case 'ArrowRight':
  //       // setLookAt([0, Math.PI, 0]);
  //       // setCharY((prev) => prev - 1);
  //       // walkRun(e);
  //       man1.current.applyImpulse({ x: 0.2, y: 0, z: 0 });

  //       break;
  //     case 'ArrowLeft':
  //       // setLookAt([0, 0, 0]);
  //       // setCharY((prev) => prev + 1);
  //       // walkRun(e);
  //       man1.current.applyImpulse({ x: -0.2, y: 0, z: 0 });
  //       break;
  //     case 'Space':
  //       jump();
  //       break;
  //   }
  // };

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  );

  return (
    <div className="gogo">
      <KeyboardControls map={map}>
        <Canvas>
          <Suspense>
            <Physics>
              <MovingCharacter />

              <RigidBody colliders="cuboid" name="floor1">
                <Box position={[0, -1, 0]} args={[1, 1, 1]}>
                  <meshStandardMaterial color={'red'} />
                </Box>
              </RigidBody>
              <RigidBody name="floor2" colliders="cuboid" type="fixed">
                <Box position={[0, -2, 0]} args={[20, 0.5, 20]}>
                  <meshStandardMaterial color={'yellow'} />
                </Box>
                {/* <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} /> */}
              </RigidBody>
            </Physics>

            <ambientLight intensity={0.8} />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <style jsx>
        {`
          .gogo {
            width: 100vw;
            height: 90vh;
          }
        `}
      </style>
    </div>
  );
}
