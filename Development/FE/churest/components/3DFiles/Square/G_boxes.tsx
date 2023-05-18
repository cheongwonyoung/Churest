/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 g_boxes.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    boxes: THREE.Mesh;
  };
  materials: {
    ['Material.071']: THREE.MeshStandardMaterial;
  };
};

export function G_boxes(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.g_boxes_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.boxes.geometry}
        material={materials['Material.071']}
        position={[-8.79, 0.29, 9.9]}
        scale={0.4}
        castShadow
      />
    </group>
  );
}

useGLTF.preload(glbs.g_boxes_glb);