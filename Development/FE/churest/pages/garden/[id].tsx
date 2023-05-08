import { Box, KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo, useState, useEffect, useRef } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import MovingCharacter from '@/components/common/MovingCharacter';
import { Vector3 } from 'three';
import { Branch } from '@/components/3DFiles/Trees/Branch';
import { Seed } from '@/components/3DFiles/Trees/Seed';
import { Tree9 } from '@/components/3DFiles/Trees/Tree9';
import { Test } from '@/components/3DFiles/Test';
import CharacterChurest from '@/components/churest/CharacterChurest';
import { ChurestMap } from '@/components/3DFiles/ChurestMap';
import { spots } from '@/utils/spots';
import { PlantOk } from '@/components/3DFiles/PlantOk';
import { PlantNo } from '@/components/3DFiles/PlantNo';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  // jump: 'jump',
};

export default function Garden() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      // { name: Controls.jump, keys: ['Space'] },
    ],
    []
  );

  const [position, setPosition] = useState([0, 0, 0]);
  const logSpot = (x: number[]) => {
    setPosition(x);
  };

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

  const [points, setpoints] = useState(spots);
  console.log(points);

  return (
    <div className="gogo">
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
      <KeyboardControls map={map}>
        <Canvas>
          <Suspense>
            <Physics>
              {/* <MovingCharacter logSpot={logSpot} autoView={autoView} /> */}
              {/* {Object.entries(points).map((point: any) => {
                return (
                  <RigidBody type="fixed">
                    {point[1].ok ? (
                      <PlantOk
                        name={point[0]}
                        position={[point[1].x, -6.48, point[1].z]}
                      />
                    ) : (
                      <PlantNo
                        name={point[0]}
                        position={[point[1].x, -6.48, point[1].z]}
                      />
                    )}
                  </RigidBody>
                );
              })} */}
              <CharacterChurest logSpot={logSpot} autoView={autoView} />
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
                colliders="trimesh"
                type="fixed"
                position={[0, 0, 0]}
                friction={1}
              >
                <ChurestMap />
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
