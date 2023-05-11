import { Html, KeyboardControls, SoftShadows } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import {
  CuboidCollider,
  CylinderCollider,
  Physics,
  RapierCollider,
  RigidBody,
} from '@react-three/rapier';
import { Suspense, useEffect, useMemo, useState } from 'react';
import CharacterChurest from './CharacterChurest';
import ChoosePosition from './ChoosePosition';
import { PostBox } from '../3DFiles/PostBox';
import { BirdHouse3 } from '../3DFiles/BirdHouse/BirdHouse3';
import { ChurestMap } from '../3DFiles/ChurestMap';
import { House1 } from '../3DFiles/House/House_1';
import { Tree3 } from '../3DFiles/Trees/Tree3';
import { Tree1 } from '../3DFiles/Trees/Tree1';
import { Seed } from '../3DFiles/Trees/Seed';
import { Tree4 } from '../3DFiles/Trees/Tree4';
import { Tree5 } from '../3DFiles/Trees/Tree5';
import { Tree6 } from '../3DFiles/Trees/Tree6';
import { Tree2 } from '../3DFiles/Trees/Tree2';
import { Tree7 } from '../3DFiles/Trees/Tree7';
import { Tree8 } from '../3DFiles/Trees/Tree8';
import { Tree9 } from '../3DFiles/Trees/Tree9';
import { Sprout } from '../3DFiles/Trees/Sprout';
import { Branch } from '../3DFiles/Trees/Branch';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  letterBoxAtom,
  myBirdAtom,
  openMyPageAtom,
  spaceModalAtom,
} from '@/atoms/modal';
import { loginAtom } from '@/atoms/login';
import { Mountain } from '../3DFiles/Rock/Mountain';
import { Rock1 } from '../3DFiles/Rock/Rock1';
import { Rock2 } from '../3DFiles/Rock/Rock2';
import { Rock3 } from '../3DFiles/Rock/Rock3';
import { Rock4 } from '../3DFiles/Rock/Rock4';
import { Rock5 } from '../3DFiles/Rock/Rock5';
import {
  Camera,
  DirectionalLight,
  DirectionalLightShadow,
  Vector2,
} from 'three';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getForest } from '@/apis/churest';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

type Props = {
  selectSpot: boolean;
  autoView: boolean;
};
export default function Churest3D({ selectSpot, autoView }: Props) {
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

  const directionalLight = new DirectionalLight(0xffffff, 2);
  const gogo = useThree();
  useEffect(() => {
    directionalLight.position.set(15, 30, 16);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.x = 4 * 1024; // default
    directionalLight.shadow.mapSize.y = 4 * 1024; // defaultw
    directionalLight.shadow.camera.top = 40;
    directionalLight.shadow.camera.bottom = -40;
    directionalLight.shadow.camera.left = -40;
    directionalLight.shadow.camera.right = 40;
    directionalLight.shadow.camera.near = 0.5; // default
    directionalLight.shadow.camera.far = 500; // default
    directionalLight.shadow.bias = 0.0001;
    gogo.scene.add(directionalLight);
  }, []);

  const setIsMyPageOpen = useSetRecoilState(openMyPageAtom);
  const setIsMyBirdOpen = useSetRecoilState(myBirdAtom);
  const setIsPostBoxOpen = useSetRecoilState(letterBoxAtom);
  const [readyModal, setReadyModal] = useRecoilState(spaceModalAtom);
  const spaceModal = () => {
    switch (readyModal) {
      case 'postBox':
        setIsPostBoxOpen({ isModal: true });
        setReadyModal('');
        return;
      case 'myBird':
        setIsMyBirdOpen({ isModal: true });
        setReadyModal('');

        return;
      case 'myPage':
        setIsMyPageOpen({ isModal: true });
        setReadyModal('');

        return;
      default:
        return;
    }
  };

  const memberId = useRouter().query.id;
  const { data, refetch } = useQuery(
    ['tree', memberId],
    () => getForest(memberId),
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  return (
    <>
      <KeyboardControls map={map}>
        <Suspense>
          <Physics>
            <SoftShadows />
            {/* <MovingCharacter logSpot={logSpot} autoView={autoView} /> */}
            <CharacterChurest
              autoView={autoView}
              selectSpot={selectSpot}
              spaceModal={spaceModal}
            />
            {selectSpot ? (
              <>
                <ChoosePosition />
              </>
            ) : (
              <>
                <RigidBody position={[0, 0.5, 0]} type="fixed" name="house">
                  <group onClick={() => setIsMyPageOpen({ isModal: true })}>
                    <House1 />
                  </group>
                  <CylinderCollider
                    sensor
                    args={[5, 2]}
                    onIntersectionEnter={(e) => {
                      e.colliderObject?.name == 'character' &&
                        setReadyModal('myPage');
                    }}
                    onIntersectionExit={(e) => {
                      e.colliderObject?.name == 'character' &&
                        setReadyModal('');
                    }}
                  />
                </RigidBody>
                <RigidBody position={[-4.5, 0, 4.5]} type="fixed">
                  <group onClick={() => setIsPostBoxOpen({ isModal: true })}>
                    <PostBox />
                  </group>
                  <CylinderCollider
                    sensor
                    args={[5, 2]}
                    onIntersectionEnter={(e) => {
                      e.colliderObject?.name == 'character' &&
                        setReadyModal('postBox');
                    }}
                    onIntersectionExit={(e) => {
                      e.colliderObject?.name == 'character' &&
                        setReadyModal('');
                    }}
                  />
                </RigidBody>
                <RigidBody position={[4.5, 0, 4.5]} type="fixed">
                  <group onClick={() => setIsMyBirdOpen({ isModal: true })}>
                    {/* <BirdHouse1 />
                <BirdHouse2 /> */}
                    <BirdHouse3 />
                  </group>
                  <CylinderCollider
                    sensor
                    args={[5, 2]}
                    onIntersectionEnter={(e) => {
                      e.colliderObject?.name == 'character' &&
                        setReadyModal('myBird');
                    }}
                    onIntersectionExit={(e) => {
                      e.colliderObject?.name == 'character' &&
                        setReadyModal('');
                    }}
                  />
                </RigidBody>
              </>
            )}

            <RigidBody
              name="map"
              colliders="trimesh"
              type="fixed"
              position={[0, 0, 0]}
              friction={1}
            >
              <ChurestMap receiveShadow />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[35, -4, -42]}
              rotation={[0, 0, 0]}
            >
              <Mountain />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-10, -6, -42]}
              name="rock"
            >
              <Rock1 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-25, -6, -43]}
              name="rock"
            >
              <Rock2 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-42, -6, -25]}
              rotation={[0, Math.PI / 2, 0]}
              name="rock"
            >
              <Rock3 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-43, -6, 0]}
              rotation={[0, Math.PI / 2, 0]}
              name="rock"
            >
              <Rock2 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-43, -6, 20]}
              rotation={[0, (-Math.PI * 0.7) / 2, 0]}
              name="rock"
            >
              <Rock1 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[46, -6, -13]}
              rotation={[0, Math.PI, 0]}
              name="rock"
            >
              <Rock4 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[45, -6, 18]}
              rotation={[0, -Math.PI / 2, 0]}
              name="rock"
            >
              <Rock5 />
            </RigidBody>
          </Physics>
          <ambientLight intensity={0.2} />
          {/* <directionalLight
            ref={light}
            castShadow
            receiveShadow
            intensity={3}
            position={[2, 3, 8]}
            shadow={{}}
          /> */}
        </Suspense>
      </KeyboardControls>
    </>
  );
}
