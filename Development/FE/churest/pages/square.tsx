import Churest3D from '@/components/churest/Churest3D';
import SquareBox from '@/components/square/SquareBox';
import { Canvas } from '@react-three/fiber';
import Navbar from '@/components/common/Navbar';
import Square3D from '@/components/square/Square3D';
import { spaceModalAtom } from '@/atoms/modal';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
export default function Square() {
  const isSpace = useRecoilValue(spaceModalAtom);

  return (
    <>
      {isSpace.length > 0 && (
        <div className="spacebar">
          <div>
            <p>SpaceBar</p>
          </div>
        </div>
      )}
      <div className="three-container">
        <Navbar types="square" />
        <Canvas camera={{ position: [8, 6, 8] }} shadows>
          <Square3D />
        </Canvas>
      </div>
      <SquareBox />
      <style jsx>{`
        .three-container {
          width: 100vw;
          height: 100vh;
          position: relative;
          background-image: url('https://images.pexels.com/photos/627823/pexels-photo-627823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
          background-size: cover;
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
      `}</style>
    </>
  );
}
