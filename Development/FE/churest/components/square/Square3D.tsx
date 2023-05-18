import {
  CuboidCollider,
  CylinderCollider,
  Physics,
  RigidBody,
} from '@react-three/rapier';
import { Suspense, useEffect, useMemo } from 'react';
import { DirectionalLight } from 'three';
import { useThree } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import SquareMap from './SquareMap';
import CharacterChurest from '../churest/CharacterChurest';
import { G_world_tree } from '../3DFiles/Square/G_worldTree';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { donationModalAtom, spaceModalAtom } from '@/atoms/modal';
import { useRouter } from 'next/router';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

export default function Square3D() {
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

  const directionalLight = new DirectionalLight(0xffffff, 1);
  const gogo = useThree();
  useEffect(() => {
    directionalLight.position.set(20, 30, 16);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.x = 4 * 1024;
    directionalLight.shadow.mapSize.y = 4 * 1024;
    directionalLight.shadow.camera.top = 40;
    directionalLight.shadow.camera.bottom = -40;
    directionalLight.shadow.camera.left = -40;
    directionalLight.shadow.camera.right = 40;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.bias = 0.0001;
    gogo.scene.add(directionalLight);
    return () => setReadyModal('');
  }, []);

  const setIsDonateOpen = useSetRecoilState(donationModalAtom);

  const clickDonate = () => {
    setIsDonateOpen({ isModal: true });
  };
  const [readyModal, setReadyModal] = useRecoilState(spaceModalAtom);

  const router = useRouter();

  const spaceModal = () => {
    switch (readyModal) {
      case 'donation':
        setIsDonateOpen({ isModal: true });
        setReadyModal('');
        return;
      case 'game1':
        router.push('/game1');
        return;
      default:
        return;
    }
  };

  return (
    <KeyboardControls map={map}>
      <Suspense>
        <Physics gravity={[0, -15, 0]}>
          <SquareMap />
          <CuboidCollider sensor args={[18, 8, 18]} name="mapSensor" />
          <CylinderCollider
            position={[0, 0, -10]}
            sensor
            args={[6, 6]}
            onIntersectionEnter={(other) => {
              if (other.colliderObject?.name == 'character') {
                setReadyModal('donation');
              }
            }}
            onIntersectionExit={(other) => {
              if (other.colliderObject?.name == 'character') {
                setReadyModal('');
              }
            }}
          />
          <CylinderCollider
            position={[6.4, 0, 14.8]}
            args={[3, 1]}
            sensor
            onIntersectionEnter={(other) => {
              if (other.colliderObject?.name == 'character') {
                setReadyModal('game1');
              }
            }}
            onIntersectionExit={(other) => {
              if (other.colliderObject?.name == 'character') {
                setReadyModal('');
              }
            }}
          />
          <RigidBody type="fixed" colliders="trimesh">
            <G_world_tree onClick={clickDonate} />
          </RigidBody>
          <CharacterChurest
            autoView={true}
            spaceModal={spaceModal}
            resetPosition={false}
          />
        </Physics>
      </Suspense>
    </KeyboardControls>
  );
}
