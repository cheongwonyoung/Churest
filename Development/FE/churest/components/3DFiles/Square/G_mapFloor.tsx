/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 g_mapFloor.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    mapFloor: THREE.Mesh;
  };
  materials: {
    ['매테리얼.017']: THREE.MeshStandardMaterial;
  };
};

export function G_mapFloor(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.g_map_floor_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.mapFloor.geometry}
        material={materials['매테리얼.017']}
        position={[0, -2, 0]}
        rotation={[0, -1.57, 0]}
        scale={[18, 2, 18]}
        castShadow
      />
    </group>
  );
}

useGLTF.preload(glbs.g_map_floor_glb);
