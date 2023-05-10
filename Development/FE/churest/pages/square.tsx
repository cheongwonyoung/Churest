import Churest3D from '@/components/churest/Churest3D';
import SquareBox from '@/components/square/SquareBox';
import { Canvas } from '@react-three/fiber';

export default function Square() {
  return (
    <>
      <div className="three-container">
        <Canvas>
          <Churest3D selectSpot={false} autoView={true} />
        </Canvas>
      </div>
      <SquareBox />
      <style jsx>{`
        .three-container {
          width: 100vw;
          height: 100vh;
        }
      `}</style>
    </>
  );
}
