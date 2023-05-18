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
import { loginAtom } from '@/atoms/login';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  letterBoxAtom,
  myBirdAtom,
  openMyPageAtom,
  spaceModalAtom,
  myTreeAtom,
  createArticleAtom,
} from '@/atoms/modal';
import { Mountain } from '../3DFiles/Rock/Mountain';
import { Rock1 } from '../3DFiles/Rock/Rock1';
import { Rock2 } from '../3DFiles/Rock/Rock2';
import { Rock3 } from '../3DFiles/Rock/Rock3';
import { Rock4 } from '../3DFiles/Rock/Rock4';
import { Rock5 } from '../3DFiles/Rock/Rock5';
import { RedFlower } from '../3DFiles/Flowers/RedFlower';
import { WhiteFlower } from '../3DFiles/Flowers/WhiteFlower';
import { BlueFlower } from '../3DFiles/Flowers/BlueFlower';
import { OrangeFlower } from '../3DFiles/Flowers/OrangeFlower';
import { GrassFlower } from '../3DFiles/Flowers/GrassFlower';
import { DirectionalLight, Vector3 } from 'three';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getForest } from '@/apis/churest';
import { spots } from '@/utils/spots';
import { BirdHouses, Houses, Trees } from './Options';
import Bird from './Bird';
import { Tile } from '../3DFiles/Tile';
import { clickedName } from '@/atoms/modal';
import { ChurestMap } from '../3DFiles/ChurestMapLast';
import Swal from 'sweetalert2';
import { forestAtom } from '@/atoms/inp';
import { TFlower_1 } from '../3DFiles/Flowers/TFlower_1';
import TileFlower from './TileFlower';
import Loader3D from '../common/Loader3D';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

type Props = {
  autoView: boolean;
  resetPosition: boolean;
};
export default function Churest3D({ autoView, resetPosition }: Props) {
  // const [name, setClickedName] = useRecoilState(clickedName);
  // const showAlert = () => {
  //   Swal.fire({
  //     title: name.name + '의 츄레스트',
  //     position: 'center',
  //     showConfirmButton: false,
  //     timer: 1000,
  //   });
  // };

  let loginId = useRecoilValue(loginAtom).id;
  // 방문 츄레스트 id
  const router = useRouter();
  let churestId = Number(router.query.id);

  if (loginId == churestId) {
    churestId = loginId;
  }

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

  const directionalLight = new DirectionalLight(0xffffff, 1.4);
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
        setIsMyPageOpen({ isModal: true, myPageId: churestId });
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
        console.log(data);
      },
    }
  );
  const spotINfo = spots;

  const refetchTime = useRecoilValue(forestAtom);
  useEffect(() => {
    refetch();
  }, [refetchTime]);
  useEffect(() => {
    return () => {
      setReadyModal('');
      setIsSelect({
        isModal: false,
        spot: -1,
        isSelect: false,
        isTagged: false,
        boardId: -1,
        isTagModal: false,
      });
    };
  }, []);
  const [isSelect, setIsSelect] = useRecoilState(createArticleAtom);
  return (
    <>
      <KeyboardControls map={map}>
        <Suspense>
          <Physics>
            <SoftShadows />
            {/* <MovingCharacter logSpot={logSpot} autoView={autoView} /> */}
            <CharacterChurest
              autoView={autoView}
              spaceModal={spaceModal}
              resetPosition={resetPosition}
            />
            {isSelect.isSelect ? (
              <>
                <ChoosePosition occupied={data?.data.treeList} />
              </>
            ) : (
              <>
                {/* 나의 집 3D start */}
                {data?.data.houseId && (
                  <RigidBody position={[0, 0, 0]} type="fixed" name="house">
                    <group
                      onClick={() =>
                        setIsMyPageOpen({ isModal: true, myPageId: churestId })
                      }
                    >
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
                )}
                {/* 나의 집 3D end */}
                {/* 꽃들 */}
                <WhiteFlower
                  position={[5, -2.5, 0]}
                  type="fixed"
                  name="whiteFlower"
                />
                <WhiteFlower
                  position={[-2, -2.5, 1]}
                  type="fixed"
                  name="whiteFlower"
                />
                <WhiteFlower position={[-2.5, -2.7, 0.5]} />
                <WhiteFlower
                  position={[-1, -2.5, -3]}
                  type="fixed"
                  name="whiteFlower"
                />
                <BlueFlower
                  position={[5, 0, 0]}
                  type="fixed"
                  name="blueFlower"
                />
                <GrassFlower
                  position={[5.2, -1, 1.5]}
                  type="fixed"
                  name="blueFlower"
                />
                <BlueFlower
                  position={[-3, 0, -2]}
                  type="fixed"
                  name="blueFlower"
                />
                <GrassFlower
                  position={[-2, -1, -1.4]}
                  type="fixed"
                  name="blueflower"
                />
                <group>
                  <OrangeFlower
                    position={[-5.5, -1.5, -4.4]}
                    type="fixed"
                    name="orangeFlower"
                  />
                  <GrassFlower
                    position={[-4, -1, -3]}
                    type="fixed"
                    name="grass"
                  />
                </group>
                {/* 우측상단 잔디 */}
                <group>
                  <GrassFlower
                    position={[5, -1, -4.5]}
                    type="fixed"
                    name="grassflower"
                  />{' '}
                  <GrassFlower
                    position={[5.3, -1, -4.7]}
                    type="fixed"
                    name="grassflower"
                    rotation={[0, Math.PI / 2, 0]}
                  />
                </group>
                <group>
                  <GrassFlower
                    position={[-4.2, -1, -3.2]}
                    type="fixed"
                    name="grass"
                  />
                </group>
                <GrassFlower position={[-5, -1, 5]} />
                <GrassFlower position={[-4.5, -1, 5.5]} />
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
                <GrassFlower
                  position={[-4, -1.5, 0.5]}
                  type="fixed"
                  name="blueFlower"
                />
                {/* 우편함 3D end */}
                {/* 새집 3D start */}
                {data?.data.birdhouseId && (
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
                )}
                {/* 새집 3D end */}
                {/* 새 3D */}
                {data?.data.birdId && <Bird id={data?.data.birdId} />}
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
                      <>
                        <TileFlower
                          id={tree.treeId}
                          position={
                            new Vector3(
                              spotINfo[tree.spot]['x'],
                              0,
                              spotINfo[tree.spot]['z']
                            )
                          }
                        />
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
                      </>
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
            {/* 상단 바위 ( center )*/}
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[23, -4, -30]}
              rotation={[0, 0, 0]}
            >
              <Mountain />
            </RigidBody>
            {/* 바위 */}
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-2, -6, -43]}
              name="rock"
            >
              <Rock1 />
            </RigidBody>
            {/* 상단 바위 ( left )*/}
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-17, -6, -30]}
              name="rock"
            >
              <Rock2 />
            </RigidBody>
            {/* 좌측 바위 */}
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-26, -6, -17]}
              rotation={[0, Math.PI / 2, 0]}
              name="rock"
            >
              <Rock3 />
            </RigidBody>
            {/* 좌측 바위 */}
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-30, -6, 8]}
              rotation={[0, Math.PI / 2, 0]}
              name="rock"
            >
              <Rock2 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-33, -6, 3]}
              rotation={[0, Math.PI / 3, 0]}
              name="rock"
            >
              <Rock2 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-27, -7, 24]}
              rotation={[0, Math.PI, 0]}
              name="rock"
            >
              <Rock2 />
            </RigidBody>
            {/* 좌측 상단 바위 */}
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-35, -6, -28]}
              rotation={[0, (-Math.PI * 0.7) / 2, 0]}
              name="rock"
            >
              <Rock1 />
            </RigidBody>
            {/* 우측 계곡 바위 */}
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[29, -6, -10]}
              rotation={[0, Math.PI, 0]}
              name="rock"
            >
              <Rock4 />
            </RigidBody>
            {/* 우측 하단 바위 */}
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[35, -6, 10]}
              rotation={[0, -Math.PI / 4, 0]}
              name="rock"
            >
              <Rock5 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[36, -4, 20]}
              rotation={[0, -Math.PI / 4, 0]}
              name="rock"
            >
              <Rock5 />
            </RigidBody>
            {/* 하단 */}
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-2, -6, 33]}
              name="rock"
            >
              <Rock1 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[15, -6, 33]}
              name="rock"
            >
              <Rock1 />
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
