/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 bird1.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    Sphere003: THREE.Mesh;
    Sphere003_1: THREE.Mesh;
    Sphere003_2: THREE.Mesh;
    Sphere003_3: THREE.Mesh;
    Sphere003_4: THREE.Mesh;
    Sphere003_5: THREE.Mesh;
    Sphere003_6: THREE.Mesh;
  };
  materials: {
    ['Material.029']: THREE.MeshStandardMaterial;
    ['Material.030']: THREE.MeshStandardMaterial;
    ['Material.031']: THREE.MeshStandardMaterial;
    ['Material.032']: THREE.MeshStandardMaterial;
    ['Material.033']: THREE.MeshStandardMaterial;
    ['Material.034']: THREE.MeshStandardMaterial;
    ['Material.035']: THREE.MeshStandardMaterial;
  };
};

export function Bird1(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.bird_1_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.54, 0.83]} scale={0.12}>
        <mesh
          geometry={nodes.Sphere003.geometry}
          material={materials['Material.029']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere003_1.geometry}
          material={materials['Material.030']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere003_2.geometry}
          material={materials['Material.031']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere003_3.geometry}
          material={materials['Material.032']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere003_4.geometry}
          material={materials['Material.033']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere003_5.geometry}
          material={materials['Material.034']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere003_6.geometry}
          material={materials['Material.035']}
          castShadow
        />
      </group>
    </group>
  );
}

// useGLTF.preload(glbs.bird_1_glb);
