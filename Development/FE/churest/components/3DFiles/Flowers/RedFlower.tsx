import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    fantasy_plant076: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
  };
};

export function RedFlower(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.flower_red_glb) as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.fantasy_plant076.geometry}
        material={materials['Material.001']}
        position={[0, 0.5, 0]}
        scale={0.2}
      />
    </group>
  );
}

useGLTF.preload(glbs.flower_red_glb);
