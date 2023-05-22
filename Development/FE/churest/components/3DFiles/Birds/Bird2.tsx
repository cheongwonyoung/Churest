/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 bird2.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    Sphere005: THREE.Mesh;
    Sphere005_1: THREE.Mesh;
    Sphere005_2: THREE.Mesh;
    Sphere005_3: THREE.Mesh;
    Sphere005_4: THREE.Mesh;
    Sphere005_5: THREE.Mesh;
    Sphere005_6: THREE.Mesh;
    Sphere005_7: THREE.Mesh;
  };
  materials: {
    ['Material.021']: THREE.MeshStandardMaterial;
    ['Material.022']: THREE.MeshStandardMaterial;
    ['Material.023']: THREE.MeshStandardMaterial;
    ['Material.024']: THREE.MeshStandardMaterial;
    ['Material.025']: THREE.MeshStandardMaterial;
    ['Material.026']: THREE.MeshStandardMaterial;
    ['Material.027']: THREE.MeshStandardMaterial;
    ['Material.028']: THREE.MeshStandardMaterial;
  };
};

export function Bird2(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.bird_2_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.24, 0.74]} scale={0.1}>
        <mesh
          geometry={nodes.Sphere005.geometry}
          material={materials['Material.021']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere005_1.geometry}
          material={materials['Material.022']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere005_2.geometry}
          material={materials['Material.023']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere005_3.geometry}
          material={materials['Material.024']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere005_4.geometry}
          material={materials['Material.025']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere005_5.geometry}
          material={materials['Material.026']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere005_6.geometry}
          material={materials['Material.027']}
          castShadow
        />
        <mesh
          geometry={nodes.Sphere005_7.geometry}
          material={materials['Material.028']}
          castShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload(glbs.bird_2_glb);
