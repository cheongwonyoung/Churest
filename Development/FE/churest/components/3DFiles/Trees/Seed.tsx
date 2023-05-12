import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    원형: THREE.Mesh;
    원형_1: THREE.Mesh;
    원형_2: THREE.Mesh;
  };
  materials: {
    ['매테리얼.001']: THREE.MeshStandardMaterial;
    ['매테리얼.002']: THREE.MeshStandardMaterial;
    ['매테리얼.003']: THREE.MeshStandardMaterial;
  };
};

export function Seed(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.seed_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]} scale={0.14}>
        <mesh
          geometry={nodes.원형.geometry}
          material={materials['매테리얼.001']}
        />
        <mesh
          geometry={nodes.원형_1.geometry}
          material={materials['매테리얼.002']}
        />
        <mesh
          geometry={nodes.원형_2.geometry}
          material={materials['매테리얼.003']}
        />
      </group>
    </group>
  );
}

useGLTF.preload(glbs.seed_glb);
