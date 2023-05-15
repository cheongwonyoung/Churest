import { KeyboardControls, SoftShadows } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import {
  CuboidCollider,
  CylinderCollider,
  Physics,
  RigidBody,
} from '@react-three/rapier';
import { Suspense, useEffect, useMemo, useState } from 'react';
import CharacterChurest from './CharacterChurest';
import ChoosePosition from './ChoosePosition';
import { PostBox } from '../3DFiles/PostBox';
import { Tree3 } from '../3DFiles/Trees/Tree3';

import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  letterBoxAtom,
  myBirdAtom,
  openMyPageAtom,
  spaceModalAtom,
  myTreeAtom,
} from '@/atoms/modal';
import { Mountain } from '../3DFiles/Rock/Mountain';
import { Rock1 } from '../3DFiles/Rock/Rock1';
import { Rock2 } from '../3DFiles/Rock/Rock2';
import { Rock3 } from '../3DFiles/Rock/Rock3';
import { Rock4 } from '../3DFiles/Rock/Rock4';
import { Rock5 } from '../3DFiles/Rock/Rock5';
import { DirectionalLight, Vector3 } from 'three';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getForest } from '@/apis/churest';
import { spots } from '@/utils/spots';
import { BirdHouses, Houses, Trees } from './Options';

import Bird from './Bird';
import { Sample } from '../3DFiles/Sample';
import { Tile } from '../3DFiles/Tile';
import { ChurestMap } from '../3DFiles/ChurestMapLast';

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
  resetPosition: boolean;
};
export default function Churest3D({
  selectSpot,
  autoView,
  resetPosition,
}: Props) {
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

  const directionalLight = new DirectionalLight(0xffffff, 1.8);
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

  const setIsMyPageOpen = useSetRecoilState(openMyPageAtom);
  const setIsMyBirdOpen = useSetRecoilState(myBirdAtom);
  const setIsPostBoxOpen = useSetRecoilState(letterBoxAtom);
  const setIsMyTreeOpen = useSetRecoilState(myTreeAtom);
  const [readyModal, setReadyModal] = useRecoilState(spaceModalAtom);
  const [myTreeId, setTreeId] = useState(0);

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
      case 'myTree':
        setIsMyTreeOpen({
          isModal: true,
          boardId: myTreeId,
        });
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
        console.log('추레스트에 왔단다');
        console.log(data);
      },
    }
  );
  const spotINfo = spots;

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
              resetPosition={resetPosition}
            />
            {selectSpot ? (
              <>
                <ChoosePosition occupied={data?.data.treeList} />
              </>
            ) : (
              <>
                {/* 나의 집 3D start */}
                <RigidBody position={[0, 0.2, 0]} type="fixed" name="house">
                  <group onClick={() => setIsMyPageOpen({ isModal: true })}>
                    {Houses(data?.data.houseId)}
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
                {/* 나의 집 3D end */}

                {/* 우편함 3D start */}
                <RigidBody position={[-4.5, 0, 0]} type="fixed">
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
                {/* 우편함 3D end */}

                {/* 새집 3D start */}
                <RigidBody position={[4.5, 0, 0]} type="fixed">
                  <group onClick={() => setIsMyBirdOpen({ isModal: true })}>
                    {BirdHouses(data?.data.birdhouseId)}
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
                {/* 새집 3D end */}
                {/* 새 3D */}
                <Bird id={data?.data.birdId} />
                {/* 추억 나무 리스트 start */}
                {data?.data.treeList?.map(
                  (
                    tree: {
                      boardId: number;
                      spot: number;
                      score: number;
                      treeId: number;
                    },
                    idx: number
                  ) => {
                    return (
                      <RigidBody
                        key={idx}
                        position={
                          new Vector3(
                            spotINfo[tree.spot]['x'],
                            0,
                            spotINfo[tree.spot]['z']
                          )
                        }
                        type="fixed"
                        colliders="trimesh"
                      >
                        <group
                          onClick={() =>
                            setIsMyTreeOpen({
                              isModal: true,
                              boardId: tree.boardId,
                            })
                          }
                          position={[0, 0.025, 0]}
                        >
                          {Trees(tree)}
                        </group>
                        <Tile position={[0, -0.025, 0]} />
                        <CylinderCollider
                          sensor
                          args={[5, 2]}
                          onIntersectionEnter={(e) => {
                            if (e.colliderObject?.name == 'character') {
                              setTreeId(tree.boardId);
                              setReadyModal('myTree');
                              console.log(tree.boardId + '에게 다가갔떠');
                            }
                          }}
                          onIntersectionExit={(e) => {
                            e.colliderObject?.name == 'character' &&
                              setReadyModal('');
                          }}
                        />
                      </RigidBody>
                    );
                  }
                )}
                {/* 추억 나무 리스트 end */}
              </>
            )}

            <RigidBody
              name="map"
              colliders="trimesh"
              type="fixed"
              position={[0, 0, 0]}
              friction={1}
            >
              <ChurestMap />
              <CuboidCollider sensor args={[22, 8, 22]} name="mapSensor" />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[23, -4, -33]}
              rotation={[0, 0, 0]}
            >
              <Mountain />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-2, -6, -34]}
              name="rock"
            >
              <Rock1 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-17, -6, -35]}
              name="rock"
            >
              <Rock2 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-34, -6, -17]}
              rotation={[0, Math.PI / 2, 0]}
              name="rock"
            >
              <Rock3 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-35, -6, 8]}
              rotation={[0, Math.PI / 2, 0]}
              name="rock"
            >
              <Rock2 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-35, -6, -28]}
              rotation={[0, (-Math.PI * 0.7) / 2, 0]}
              name="rock"
            >
              <Rock1 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[38, -6, -5]}
              rotation={[0, Math.PI, 0]}
              name="rock"
            >
              <Rock4 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[37, -6, 10]}
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
