import { Canvas } from '@react-three/fiber';
import { Tree1 } from '../3DFiles/Trees/Tree1';
import { Tree2 } from '../3DFiles/Trees/Tree2';
import { Tree3 } from '../3DFiles/Trees/Tree3';
import { Tree4 } from '../3DFiles/Trees/Tree4';
import { Tree5 } from '../3DFiles/Trees/Tree5';
import { Tree6 } from '../3DFiles/Trees/Tree6';
import { Tree7 } from '../3DFiles/Trees/Tree7';
import { Tree8 } from '../3DFiles/Trees/Tree8';
import { Tree9 } from '../3DFiles/Trees/Tree9';

type Props = {
  treeType: number;
};
export default function Tree({ treeType }: Props) {
  return (
    <div style={{ width: '80%', height: '80%', marginTop: '200px' }}>
      <Canvas shadows camera={{ zoom: 1 }}>
        <mesh receiveShadow castShadow>
          {treeType == 1 ? (
            <Tree1 />
          ) : treeType == 2 ? (
            <Tree2 />
          ) : treeType == 3 ? (
            <Tree3 />
          ) : treeType == 4 ? (
            <Tree4 />
          ) : treeType == 5 ? (
            <Tree5 />
          ) : treeType == 6 ? (
            <Tree6 />
          ) : treeType == 7 ? (
            <Tree7 />
          ) : treeType == 8 ? (
            <Tree8 />
          ) : (
            <Tree9 />
          )}
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
