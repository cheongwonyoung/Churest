import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import Image from 'next/image';
import { images } from '@/public/assets/images';
import Churest3D from '@/components/churest/Churest3D';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createArticleAtom, spaceModalAtom } from '@/atoms/modal';
import ModalBlackBg from '@/components/common/ModalBlackBg';
import CreateArticle from '@/components/churest/CreateArticle';
import Navbar from '@/components/common/Navbar';

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

  const isSpace = useRecoilValue(spaceModalAtom);

  return (
    <div className="gogo">
      <Navbar />
      {isSpace.length > 0 && (
        <div className="spacebar">
          <div>
            <p>SpaceBar</p>
          </div>
        </div>
      )}

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
                width={80}
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
            position: relative;
          }
          .navbarBox {
            position: absolute;
            right: 0;
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
            box-shadow: 60px 60px 80px rgba(254, 255, 193, 0.55),
              inset -60px -60px 80px rgb(254, 255, 193),
              inset 1px 1px 5px rgb(254, 255, 193);
          }
          .plantTree:hover {
            cursor: pointer;
            transform: scale(1.05);
            transition: transform 0.5s;
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
          p {
            margin-top: 5px;
            font-weight: bold;
          }
          .spacebar {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            width: 100vw;
            height: 80vh;
          }
          .spacebar div {
            width: 300px;
            height: 80px;
            z-index: 200;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
            background-color: #ebebeb8c;
            border-radius: 10px;
            box-shadow: 0px 3px 3px 0px rgba(209, 209, 209, 0.7),
              inset 0px -1px 8px 0px rgba(145, 145, 145, 0.9),
              inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);
            padding-left: 12px;
          }
          .spacebar div p {
            font-weight: 900;
            color: rgb(155, 155, 155);
            margin: 0;
            font-size: 40px;
          }
        `}
      </style>
    </div>
  );
}
