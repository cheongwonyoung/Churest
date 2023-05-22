/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Branch.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    treebranch: THREE.Mesh;
  };
  materials: {
    ['Material.011']: THREE.MeshStandardMaterial;
  };
};

export function Branch(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.branch_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.treebranch.geometry}
        material={materials['Material.011']}
        position={[0.11, 0.88, 0]}
        scale={0.29}
        castShadow
      />
    </group>
  );
}

useGLTF.preload(glbs.branch_glb);
