/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Flower_Pack.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { glbs } from '@/public/assets/glb';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Plane000_0: THREE.Mesh;
    Plane002_0: THREE.Mesh;
    Plane003_0: THREE.Mesh;
    Plane004_0: THREE.Mesh;
  };
  materials: {
    Flower2: THREE.MeshStandardMaterial;
    Flower1: THREE.MeshStandardMaterial;
    Flower3: THREE.MeshStandardMaterial;
    Flower4: THREE.MeshStandardMaterial;
  };
};

export function PackFlower(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.flower_pack_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.03}>
        <mesh
          geometry={nodes.Plane000_0.geometry}
          material={materials.Flower2}
          position={[6.89, 0.86, 0]}
          scale={0.79}
          castShadow
        />
        <mesh
          geometry={nodes.Plane002_0.geometry}
          material={materials.Flower1}
          position={[-0.19, -21.28, -0.1]}
          rotation={[0, 0, 1.17]}
          scale={0.9}
          castShadow
        />
        <mesh
          geometry={nodes.Plane003_0.geometry}
          material={materials.Flower3}
          position={[-1.27, 18.64, -0.1]}
          rotation={[0, 0, 2.64]}
          scale={0.91}
          castShadow
        />
        <mesh
          geometry={nodes.Plane004_0.geometry}
          material={materials.Flower4}
          position={[-17.53, 0.12, -0.1]}
          rotation={[0, 0, 0.21]}
          castShadow
        />
      </group>
    </group>
  );
}

// useGLTF.preload(glbs.flower_pack_glb);
