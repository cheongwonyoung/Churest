import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense, useMemo } from 'react';
import CharacterChurest from './CharacterChurest';
import ChoosePosition from './ChoosePosition';
import { PostBox } from '../3DFiles/PostBox';
import { BirdHouse3 } from '../3DFiles/BirdHouse/BirdHouse3';
import { ChurestMap } from '../3DFiles/ChurestMap';
import { House1 } from '../3DFiles/House/House_1';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
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
    ],
    []
  );
  return (
    <KeyboardControls map={map}>
      <Canvas className="canvas">
        <Suspense>
          <Physics>
            {/* <MovingCharacter logSpot={logSpot} autoView={autoView} /> */}
            <CharacterChurest autoView={autoView} selectSpot={selectSpot} />
            {selectSpot ? (
              <>
                <ChoosePosition />
              </>
            ) : (
              <>
                <RigidBody position={[0, 0.5, 0]} type="fixed">
                  <House1 />
                </RigidBody>
                <RigidBody position={[-4.5, 0, 4.5]} type="fixed">
                  <PostBox />
                </RigidBody>
                <RigidBody position={[4.5, 0, 4.5]} type="fixed">
                  {/* <BirdHouse1 />
                <BirdHouse2 /> */}
                  <BirdHouse3 castShadow />
                </RigidBody>
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
  );
}
