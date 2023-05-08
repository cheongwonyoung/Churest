/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 house_3.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    building003: THREE.Mesh;
  };
  materials: {
    ['Material.003']: THREE.MeshStandardMaterial;
  };
};

export function House_3(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'https://storage.googleapis.com/churest-bucket/project_3D/house_3.glb'
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.building003.geometry}
        material={materials['Material.003']}
      />
    </group>
  );
}

useGLTF.preload('/house_3.glb');
