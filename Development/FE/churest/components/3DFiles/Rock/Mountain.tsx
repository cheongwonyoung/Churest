/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Mountain.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    mountain: THREE.Mesh;
  };
  materials: {
    ['Material.006']: THREE.MeshStandardMaterial;
  };
};

export function Mountain(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.mountain_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.mountain.geometry}
        material={materials['Material.006']}
        position={[0, 14.65, 0]}
        rotation={[0, -1.38, 0]}
        scale={0.46}
      />
    </group>
  );
}

// useGLTF.preload(glbs.mountain_glb);
