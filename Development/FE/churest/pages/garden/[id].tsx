import { Man1 } from '@/components/3DFiles/Man1';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function Garden() {
  return (
    <div className="gogo">
      내정원
      <Canvas camera={{}}>
        <ambientLight intensity={0.8} />
        <Man1 />
        <OrbitControls />
      </Canvas>
      <style jsx>
        {`
          .gogo {
            width: 100vh;
            height: 90vh;
          }
        `}
      </style>
    </div>
  );
}
