/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Flower_Blue_Small.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { glbs } from '@/public/assets/glb';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    pCube21_BLUE_0005: THREE.Mesh;
    pCube22_BLUE_0005: THREE.Mesh;
    pCube21_BLUE_0004: THREE.Mesh;
    pCube22_BLUE_0004: THREE.Mesh;
    pCube21_BLUE_0001: THREE.Mesh;
    pCube22_BLUE_0001: THREE.Mesh;
    pCube21_BLUE_0: THREE.Mesh;
    pCube22_BLUE_0: THREE.Mesh;
    pCube21_BLUE_0003: THREE.Mesh;
    pCube22_BLUE_0003: THREE.Mesh;
    pCube21_BLUE_0002: THREE.Mesh;
    pCube22_BLUE_0002: THREE.Mesh;
    pCube23_midred_0002: THREE.Mesh;
    pCube24_green_0002: THREE.Mesh;
    pCube25_green_0002: THREE.Mesh;
    yellow_gem1_yellowgem_0002: THREE.Mesh;
  };
  materials: {
    BLUE: THREE.MeshStandardMaterial;
    midred: THREE.MeshStandardMaterial;
    green: THREE.MeshStandardMaterial;
    yellowgem: THREE.MeshStandardMaterial;
  };
};

export function BlueFlower(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.flower_blue_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.pCube21_BLUE_0005.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube22_BLUE_0005.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube21_BLUE_0004.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube22_BLUE_0004.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube21_BLUE_0001.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube22_BLUE_0001.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube21_BLUE_0.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube22_BLUE_0.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube21_BLUE_0003.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube22_BLUE_0003.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube21_BLUE_0002.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube22_BLUE_0002.geometry}
            material={materials.BLUE}
            castShadow
          />
          <mesh
            geometry={nodes.pCube23_midred_0002.geometry}
            material={materials.midred}
            castShadow
          />
          <mesh
            geometry={nodes.pCube24_green_0002.geometry}
            material={materials.green}
            castShadow
          />
          <mesh
            geometry={nodes.pCube25_green_0002.geometry}
            material={materials.green}
            castShadow
          />
          <mesh
            geometry={nodes.yellow_gem1_yellowgem_0002.geometry}
            material={materials.yellowgem}
            castShadow
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(glbs.flower_blue_glb);
