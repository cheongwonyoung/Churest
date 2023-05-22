import { Html, useProgress } from '@react-three/drei';

export default function Loader3D() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loding-box">
        <p>로딩중...</p>
        <p>{Math.floor(progress)} %</p>
        <div className="loading-body">
          <div className="loading-step"></div>
        </div>
      </div>
      <style jsx>{`
        .loding-box {
          width: 100vw;
          height: 100vh;
          background-color: black;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loading-body {
          width: 500px;
          height: 100px;
          background-color: white;
          padding: 20px;
        }
        .loading-step {
          width: ${Math.floor(progress)}%;
          background-color: aqua;
          height: 100%;
        }
      `}</style>
    </Html>
  );
}
