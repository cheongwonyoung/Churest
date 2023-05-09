import { KeyboardControls, SoftShadows } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import CharacterChurest from './CharacterChurest';
import ChoosePosition from './ChoosePosition';
import { PostBox } from '../3DFiles/PostBox';
import { BirdHouse3 } from '../3DFiles/BirdHouse/BirdHouse3';
import { ChurestMap } from '../3DFiles/ChurestMap1';
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
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { postBoxAtom } from '@/atoms/modal';
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
  const light = useRef();
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    ],
    []
  );
  const id = useRecoilValue(loginAtom).id;
  const setIsPostBox = useSetRecoilState(postBoxAtom);
  const handlePostBox = () => {
    console.log('여기');
    setIsPostBox({ isModal: true, id });
  };
  // useEffect(() => {
  //   if (light.current) {
  //     console.log('여기');

  //     light.current.shadow.mapSize.left = 40;
  //     light.current.shadow.mapSize.right = 40;
  //   }
  // }, [light.current]);
  // console.log(light.current.shadow.map);
  const directionalLight = new DirectionalLight(0xffffff, 2);
  const gogo = useThree();
  useEffect(() => {
    directionalLight.position.set(15, 30, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.x = 5 * 1024; // default
    directionalLight.shadow.mapSize.y = 5 * 1024; // defaultw
    directionalLight.shadow.camera.top = 40;
    directionalLight.shadow.camera.bottom = -40;
    directionalLight.shadow.camera.left = -40;
    directionalLight.shadow.camera.right = 40;
    directionalLight.shadow.camera.near = 0.5; // default
    directionalLight.shadow.camera.far = 500; // default
    directionalLight.shadow.radius = 100;
    gogo.scene.add(directionalLight);
  }, []);
  console.log(directionalLight);

  return (
    <>
      <KeyboardControls map={map}>
        <Suspense>
          <Physics>
            <SoftShadows />
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
                  <PostBox onClick={handlePostBox} />
                </RigidBody>
                <RigidBody position={[4.5, 0, 4.5]} type="fixed">
                  {/* <BirdHouse1 />
                <BirdHouse2 /> */}
                  <BirdHouse3 />
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
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[32, -4, -40]}
            >
              <Mountain />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-10, -2, -40]}
            >
              <Rock1 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-25, -2, -40]}
            >
              <Rock2 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-38, -2, -25]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <Rock3 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-40, -4, 0]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <Rock2 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[-41, -4, 20]}
              rotation={[0, (-Math.PI * 0.7) / 2, 0]}
            >
              <Rock1 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[41, -4, -13]}
              rotation={[0, (-Math.PI * 0.7) / 2, 0]}
            >
              <Rock4 />
            </RigidBody>
            <RigidBody
              colliders="trimesh"
              type="fixed"
              position={[45, -4, 18]}
              rotation={[0, -Math.PI / 2, 0]}
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
