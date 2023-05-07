import { Box, KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo, useState, useEffect, useRef } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import MovingCharacter from '@/components/common/MovingCharacter';
import { Vector3 } from 'three';
import { Branch } from '@/components/3DFiles/Trees/Branch';
import { Seed } from '@/components/3DFiles/Trees/Seed';
import { Tree9 } from '@/components/3DFiles/Trees/Tree9';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

export default function Garden() {
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

  const [isModal, setIsModal] = useState(false);

  // 연습 게임용
  const seongong = (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
      }}
      onClick={() => setIsModal(false)}
    >
      <p style={{ fontSize: '200px' }}>축하합니다! </p>
      <p style={{ fontSize: '200px' }}>성공입니다!</p>
    </div>
  );
  // 여기까지 연습게임용

  const [position, setPosition] = useState([0, 0, 0]);
  const logSpot = (x: number[]) => {
    setPosition(x);
  };

  // 나무 여러개 더미 포지션 백터가 필수임
  // const positions = [
  //   new Vector3(2, -1.2),
  //   new Vector3(4, -1.1),
  //   new Vector3(7, -1.2),
  //   new Vector3(13, -1.3),
  //   new Vector3(-4, -1.5),
  // ];

  const positions = [
    { x: 4, y: -1, z: 4 },
    { x: 4, t: -1, z: 12 },
    { x: 5, t: -1, z: 11 },
    { x: 5, t: -1, z: 3 },
  ];

  const positions2 = [
    { x: 3, y: -1, z: 5 },
    { x: 4, t: -1, z: 10 },
    { x: 6, t: -1, z: 9 },
    { x: 5, t: -1, z: 13 },
  ];

  const position3 = [
    { x: 7, t: -1, z: 3 },
    { x: 2, t: -1, z: 4 },
    { x: 5, t: -1, z: 8 },
    { x: 6, t: -1, z: 10 },
  ];

  const calIsPossible = () => {
    for (const ele of positions) {
      const distance = Math.sqrt(
        Math.pow(ele.x - position.x, 2) + Math.pow(ele.z - position.z, 2)
      );
      if (distance < 3) {
        console.log('여긴 못심어!');
        return;
      }
    }
    return console.log('심기 가눙!');
  };

  const [autoView, setAutoView] = useState(true);

  const zzz = useRef();

  return (
    <div className="gogo">
      {isModal && seongong}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          calIsPossible();
        }}
      >
        gogo
      </button>
      <button onMouseDown={() => setAutoView((prev) => !prev)}>
        AutoFocus
      </button>
      <button onClick={() => console.log(zzz.current)}>zzz</button>
      <KeyboardControls map={map}>
        <Canvas>
          <Suspense>
            <Physics>
              <MovingCharacter logSpot={logSpot} autoView={autoView} />
              {positions.map((position) => {
                return (
                  <RigidBody
                    position={[position.x, 0, position.z]}
                    type="fixed"
                    colliders="trimesh"
                  >
                    <Seed />
                  </RigidBody>
                );
              })}
              {positions2.map((position) => {
                return (
                  <RigidBody
                    position={[position.x, 0, position.z]}
                    type="fixed"
                    colliders="trimesh"
                  >
                    <Tree9 />
                  </RigidBody>
                );
              })}
              {position3.map((position) => {
                return (
                  <RigidBody
                    position={[position.x, 0, position.z]}
                    type="fixed"
                    colliders="trimesh"
                  >
                    {/* <MintTree /> */}
                  </RigidBody>
                );
              })}

              <RigidBody
                name="floor2"
                colliders="cuboid"
                type="fixed"
                position={[0, -1, 0]}
                friction={1}
              >
                <Box args={[40, 2, 40]} receiveShadow>
                  <meshStandardMaterial color={'#111111'} />
                </Box>
              </RigidBody>
            </Physics>

            <ambientLight intensity={0.8} />
            <directionalLight castShadow />
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
