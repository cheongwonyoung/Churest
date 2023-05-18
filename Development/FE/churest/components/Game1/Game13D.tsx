import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Game1Map } from '../3DFiles/Game1/Game1Map';
import CharacterGame1 from './CharacterGame1';
import BirdGame1 from './BirdGame1';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { gameFinishAtom } from '@/atoms/modal';

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
