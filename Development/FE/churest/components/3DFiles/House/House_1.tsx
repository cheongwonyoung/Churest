/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 house_1.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    평면004: THREE.Mesh;
    평면004_1: THREE.Mesh;
    평면004_2: THREE.Mesh;
  };
  materials: {
    ['매테리얼.002']: THREE.MeshStandardMaterial;
    ['Dark Wood']: THREE.MeshStandardMaterial;
    HI: THREE.MeshStandardMaterial;
  };
};

export function House1(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.house_1_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.39, -0.22]} rotation={[-Math.PI, 0.01, -Math.PI]}>
        <mesh
          geometry={nodes.평면004.geometry}
          material={materials['매테리얼.002']}
          castShadow
        />
        <mesh
          geometry={nodes.평면004_1.geometry}
          castShadow
          material={materials['Dark Wood']}
        />
        <mesh geometry={nodes.평면004_2.geometry} material={materials.HI} />
      </group>
    </group>
  );
}

useGLTF.preload(glbs.house_1_glb);
