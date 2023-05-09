import { Box, KeyboardControls, OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useMemo, useState, useEffect, useRef } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import { PerspectiveCamera, Vector3 } from 'three';
import { Branch } from '@/components/3DFiles/Trees/Branch';
import { Seed } from '@/components/3DFiles/Trees/Seed';
import { Tree9 } from '@/components/3DFiles/Trees/Tree9';
import CharacterChurest from '@/components/churest/CharacterChurest';
import { ChurestMap } from '@/components/3DFiles/ChurestMap';
import { spots } from '@/utils/spots';
import { PlantOk } from '@/components/3DFiles/PlantOk';
import { PlantNo } from '@/components/3DFiles/PlantNo';
import { PostBox } from '@/components/3DFiles/PostBox';
import { BirdHouse1 } from '@/components/3DFiles/BirdHouse/BirdHouse1';
import { BirdHouse2 } from '@/components/3DFiles/BirdHouse/BirdHouse2';
import { BirdHouse3 } from '@/components/3DFiles/BirdHouse/BirdHouse3';
import Image from 'next/image';
import { images } from '@/public/assets/images';
import ChoosePosition from '@/components/churest/ChoosePosition';
import Churest3D from '@/components/churest/Churest3D';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createArticleAtom } from '@/atoms/modal';
import ModalBlackBg from '@/components/common/ModalBlackBg';
import CreateArticle from '@/components/churest/CreateArticle';

export default function Garden() {
  const [autoView, setAutoView] = useState(true);
  const [selectSpot, setSelectSpot] = useState(false);
  const changeToSelect = () => {
    setSelectSpot((prev) => !prev);
  };
  const [isCreate, setIsCreate] = useRecoilState(createArticleAtom);
  const closeModal = () => {
    setIsCreate({ ...isCreate, isModal: false });
  };

  return (
    <div className="gogo">
      {isCreate.isModal && (
        <ModalBlackBg closeModal={closeModal} modal={<CreateArticle />} />
      )}
      <button onClick={() => setAutoView((prev) => !prev)}>AutoFocus</button>
      <div className="outside">
        {selectSpot ? (
          <div className="plantContainer" onClick={changeToSelect}>
            <div className="plantTree">
              <Image
                src={images.my_tree_img}
                alt="나무심기"
                width={50}
                height={80}
              />
              <p>돌아가기</p>
            </div>
          </div>
        ) : (
          <div className="plantContainer" onClick={changeToSelect}>
            <div className="plantTree">
              <Image
                src={images.my_tree_img}
                alt="나무심기"
                width={50}
                height={80}
              />
              <p>추억심기</p>
            </div>
          </div>
        )}
      </div>
      <Canvas shadows>
        <Churest3D autoView={autoView} selectSpot={selectSpot} />
      </Canvas>
      <style jsx>
        {`
          .gogo {
            width: 100vw;
            height: 100vh;
          }
          .plantTree {
            width: 240px;
            height: 120px;
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
            z-index: 5;
          }
          .canvas {
            z-index: 0;
          }
        `}
      </style>
    </div>
  );
}
