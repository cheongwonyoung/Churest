/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 PlantOk.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    평면_1: THREE.Mesh;
    평면_2: THREE.Mesh;
  };
  materials: {
    ['매테리얼.013']: THREE.MeshStandardMaterial;
    ['매테리얼.014']: THREE.MeshStandardMaterial;
  };
};

export function PlantOk(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.plant_ok_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group position={[0, 6.5, 0]} scale={[2, 1, 2]}>
        <mesh
          geometry={nodes.평면_1.geometry}
          material={materials['매테리얼.013']}
        />
        <mesh
          geometry={nodes.평면_2.geometry}
          material={materials['매테리얼.014']}
        />
      </group>
    </group>
  );
}

// useGLTF.preload(glbs.plant_ok_glb);
