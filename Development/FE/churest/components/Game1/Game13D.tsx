import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Game1Map } from '../3DFiles/Game1/Game1Map';
import CharacterGame1 from './CharacterGame1';
import BirdGame1 from './BirdGame1';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { gameFinishAtom } from '@/atoms/modal';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

type Props = {
  startNum: number;
  resetStart(): void;
};

export default function Game13D({ startNum, resetStart }: Props) {
  const [finish, setFinish] = useState(false);
  const [finishModal, setFinishModal] = useRecoilState(gameFinishAtom);
  useEffect(() => {
    if (finishModal.win == '') {
      setFinish(false);
      resetStart();
    }
  }, [finishModal.win]);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
  const gogo = useThree();

  useEffect(() => {
    directionalLight.position.set(20, 30, 16);
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

  return (
    <Suspense>
      <Physics>
        <RigidBody type="fixed" colliders="trimesh">
          <Game1Map />
        </RigidBody>
        <CharacterGame1 finish={finish} startNum={startNum} />
        <BirdGame1 finish={finish} startNum={startNum} />
        <CuboidCollider
          sensor
          position={[187.7, 0, 0]}
          args={[1, 3, 8]}
          onIntersectionEnter={({ other }) => {
            if (other.colliderObject?.name == 'bird' && finish == false) {
              setFinish(true);
              setFinishModal({ isModal: true, win: '뱁새가' });
            } else if (
              other.colliderObject?.name == 'character' &&
              finish == false
            ) {
              setFinish(true);
              setFinishModal({ isModal: true, win: '당신이' });
            }
          }}
        />
      </Physics>
      <ambientLight intensity={0.2} />
    </Suspense>
  );
}
