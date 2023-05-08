import { Box, KeyboardControls, OrbitControls } from '@react-three/drei';
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
import { House1 } from '@/components/3DFiles/House/House_1';
import { PostBox } from '@/components/3DFiles/PostBox';
import { BirdHouse1 } from '@/components/3DFiles/BirdHouse/BirdHouse1';
import { BirdHouse2 } from '@/components/3DFiles/BirdHouse/BirdHouse2';
import { BirdHouse3 } from '@/components/3DFiles/BirdHouse/BirdHouse3';
import { House3 } from '@/components/3DFiles/House/House_3';
import ChoosePosition from '@/components/churest/ChoosePosition';
import Image from 'next/image';
import { images } from '@/public/assets/images';

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

  const [selectModal, setSelectModal] = useState(false);
  const selectView = useRef();
  const changeToSelect = () => {
    setSelectModal((prev) => !prev);
    // selectView.current?.position?.set(0, 12, 0);
    console.log(selectView.current);
  };
  return (
    <div className="gogo">
      <div className="outside">
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
        <div className="plantContainer" onClick={changeToSelect}>
          <div className="plantTree">
            <Image
              src={images.my_tree_img}
              alt="나무심기"
              width={50}
              height={80}
            />
            <p>나무심기</p>
          </div>
        </div>
      </div>
      <KeyboardControls map={map}>
        <Canvas>
          <Suspense>
            <Physics>
              {/* <MovingCharacter logSpot={logSpot} autoView={autoView} /> */}
              {selectModal ? (
                <>
                  <ChoosePosition />
                  {/* <OrbitControls ref={selectView} /> */}
                  <perspectiveCamera ref={selectView} />
                </>
              ) : (
                <>
                  <RigidBody position={[0, 0.5, 0]} type="fixed">
                    {/* <House1 /> */}
                    <House3 />
                  </RigidBody>
                  <RigidBody position={[-4.5, 0, 4.5]} type="fixed">
                    <PostBox />
                  </RigidBody>
                  <RigidBody position={[4.5, 0, 4.5]} type="fixed">
                    {/* <BirdHouse1 />
                <BirdHouse2 /> */}
                    <BirdHouse3 castShadow />
                  </RigidBody>
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
                </>
              )}

              <RigidBody
                name="floor2"
                colliders="trimesh"
                type="fixed"
                position={[0, 0, 0]}
                friction={1}
              >
                <ChurestMap receiveShadow />
              </RigidBody>
            </Physics>

            <ambientLight intensity={0.8} />
            <directionalLight castShadow position={[4, 12, 4]} />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <style jsx>
        {`
          .gogo {
            width: 100vw;
            height: 100vh;
          }
          .plantTree {
            width: 300px;
            height: 150px;
            border-radius: 140px 140px 0 0;
            display: flex;
            justify-content: center;
            background-color: white;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 24px 24px 48px rgba(131, 154, 215, 0.55),
              inset -24px -24px 48px #bfd1ff, inset 12px 12px 24px #eff3ff;
          }
          .outside {
            position: absolute;
            z-index: 50;
            width: 100%;
            height: 100%;
          }
          .plantContainer {
            position: fixed;
            bottom: 0;
            display: flex;
            width: 100%;
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
}
