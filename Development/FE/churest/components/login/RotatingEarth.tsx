import { Canvas } from '@react-three/fiber';
import { LoginEarth } from '../3DFiles/LoginEarth';

export default function RotatingEarth() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ddffe7' }}>
      {/* <div style={{ width: '100%', height: '100%', backgroundColor: '#f4ff8e' }}> */}
      <Canvas shadows camera={{ zoom: 2 }}>
        <mesh receiveShadow castShadow>
          <LoginEarth />
        </mesh>
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[-5, 5, 5]}
          castShadow={true}
          intensity={2}
        />
      </Canvas>
    </div>
  );
}
