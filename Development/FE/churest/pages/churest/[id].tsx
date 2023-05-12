import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import Churest3D from '@/components/churest/Churest3D';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createArticleAtom, spaceModalAtom } from '@/atoms/modal';
import  Navbar from '@/components/common/Navbar';
import MemoryButton from '@/components/churest/MemoryButton';
import { loginAtom } from '@/atoms/login';
import { useRouter } from 'next/router';
import { images } from '@/public/assets/images';
import Image from 'next/image';

export default function Garden() {
  const memberId = useRecoilValue(loginAtom).id;
  const isSpace = useRecoilValue(spaceModalAtom);
  const router = useRouter();
  const churestId = Number(router.query.id);

  const [autoView, setAutoView] = useState(true);

  const [selectSpot, setSelectSpot] = useState(false);
  const setIsSelect = useSetRecoilState(createArticleAtom);
  const changeToSelect = () => {
    setSelectSpot((prev) => !prev);
    setIsSelect((prev) => {
      return { ...prev, isSelect: true };
    });
  };
  const isSelect = useRecoilValue(createArticleAtom).isSelect;
  useEffect(() => {
    if (isSelect == false) {
      setSelectSpot(false);
    }
  }, [isSelect]);

  const [resetPosition, setResetPosition] = useState(true);

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
      <div className="btn-box">
        <div onClick={() => setAutoView((prev) => !prev)}>
        <Image src={images["pin_focus_img"]} width={80} height={80} alt="" />
          AutoFocus
        </div>
        <div onClick={() => setResetPosition((prev) => !prev)}>
        <Image src={images["pin_home_img"]} width={80} height={80} alt="" />
          집으로 가기
        </div>
      </div>
      {churestId === memberId && (
        <MemoryButton selectSpot={selectSpot} changeToSelect={changeToSelect} />
      )}

      <Canvas shadows>
        <Churest3D
          autoView={autoView}
          selectSpot={selectSpot}
          resetPosition={resetPosition}
        />
      </Canvas>
      <style jsx>
        {`
          .gogo {
            width: 100vw;
            height: 100vh;
            position: relative;
            background-image: url('https://images.pexels.com/photos/896673/pexels-photo-896673.jpeg?auto=compress&cs=tinysrgb&w=1600');
            background-size: cover;
          }
          .navbarBox {
            position: absolute;
            right: 0;
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
            z-index: 100;
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
          .btn-box {
            position: absolute;
            left: 40px;
            top: 40px;
            z-index: 100;
            display: flex;
            text-align: center;
            font-size: 13px;
            font-weight: bold;
          }
          .btn-box div {
            display:flex;
            flex-direction:column;
            margin-right:20px;
            gap: 10px;
          }
        `}
      </style>
    </div>
  );
}
