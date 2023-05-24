/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Tree1.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    tree1: THREE.Mesh;
  };
  materials: {
    ['Material.007']: THREE.MeshStandardMaterial;
  };
};

export function Tree1(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.tree_1_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.tree1.geometry}
        material={materials['Material.007']}
        position={[-0.49, 1.85, 0]}
        scale={0.19}
        castShadow
      />
    </group>
  );
}

// useGLTF.preload(glbs.tree_1_glb);
