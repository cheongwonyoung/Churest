/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 tFlower_3.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    pCube21_BLUE_0_1: THREE.Mesh;
    pCube21_BLUE_0_2: THREE.Mesh;
    pCube21_BLUE_0_3: THREE.Mesh;
    pCube21_BLUE_0_4: THREE.Mesh;
    pCube21_BLUE_0006: THREE.Mesh;
    pCube21_BLUE_0006_1: THREE.Mesh;
    pCube21_BLUE_0006_2: THREE.Mesh;
    pCube21_BLUE_0006_3: THREE.Mesh;
    pCube21_BLUE_0007: THREE.Mesh;
    pCube21_BLUE_0007_1: THREE.Mesh;
    pCube21_BLUE_0007_2: THREE.Mesh;
    pCube21_BLUE_0007_3: THREE.Mesh;
    pCube21_BLUE_0008: THREE.Mesh;
    pCube21_BLUE_0008_1: THREE.Mesh;
    pCube21_BLUE_0008_2: THREE.Mesh;
    pCube21_BLUE_0008_3: THREE.Mesh;
    Circle001_Material001_0: THREE.Mesh;
    Circle006_Circle007_Material001_0: THREE.Mesh;
    tree008: THREE.Mesh;
    tree009: THREE.Mesh;
  };
  materials: {
    BLUE: THREE.MeshStandardMaterial;
    midred: THREE.MeshStandardMaterial;
    green: THREE.MeshStandardMaterial;
    yellowgem: THREE.MeshStandardMaterial;
    ['Material.006']: THREE.MeshStandardMaterial;
    ['Material.007']: THREE.MeshStandardMaterial;
  };
};

export function TFlower_3(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.t_flower_3_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[-99.57, 39.87, 112.9]}
            rotation={[0, 0.76, 0]}
            scale={1.12}
          >
            <mesh
              geometry={nodes.pCube21_BLUE_0_1.geometry}
              material={materials.BLUE}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0_2.geometry}
              material={materials.midred}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0_3.geometry}
              material={materials.green}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0_4.geometry}
              material={materials.yellowgem}
              castShadow
            />
          </group>
          <group
            position={[78.5, 27.76, 98.73]}
            rotation={[0, 0.64, 0]}
            scale={0.77}
          >
            <mesh
              geometry={nodes.pCube21_BLUE_0006.geometry}
              material={materials.BLUE}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0006_1.geometry}
              material={materials.midred}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0006_2.geometry}
              material={materials.green}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0006_3.geometry}
              material={materials.yellowgem}
              castShadow
            />
          </group>
          <group
            position={[-135.69, 32.06, 131.95]}
            rotation={[0, -0.91, 0]}
            scale={0.86}
          >
            <mesh
              geometry={nodes.pCube21_BLUE_0007.geometry}
              material={materials.BLUE}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0007_1.geometry}
              material={materials.midred}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0007_2.geometry}
              material={materials.green}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0007_3.geometry}
              material={materials.yellowgem}
              castShadow
            />
          </group>
          <group
            position={[-132.66, 27.76, 88]}
            rotation={[-Math.PI, 1.36, -Math.PI]}
            scale={0.77}
          >
            <mesh
              geometry={nodes.pCube21_BLUE_0008.geometry}
              material={materials.BLUE}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0008_1.geometry}
              material={materials.midred}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0008_2.geometry}
              material={materials.green}
              castShadow
            />
            <mesh
              geometry={nodes.pCube21_BLUE_0008_3.geometry}
              material={materials.yellowgem}
              castShadow
            />
          </group>
        </group>
      </group>
      <group
        position={[1.34, 0.02, -1.3]}
        rotation={[-Math.PI / 2, 0, -0.5]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Circle001_Material001_0.geometry}
            material={materials['Material.006']}
            position={[19.36, 21.39, 11.67]}
            scale={100}
            castShadow
          />
          <mesh
            geometry={nodes.Circle006_Circle007_Material001_0.geometry}
            material={materials['Material.006']}
            position={[-12.33, 25.21, 6.35]}
            scale={100}
            castShadow
          />
        </group>
      </group>
      <mesh
        geometry={nodes.tree008.geometry}
        material={materials['Material.007']}
        position={[1.55, 0.12, 0]}
        rotation={[0, -0.99, 0]}
        scale={0.21}
        castShadow
      />
      <mesh
        geometry={nodes.tree009.geometry}
        material={materials['Material.007']}
        position={[-1.68, 0.12, -1.44]}
        rotation={[0, -0.99, 0]}
        scale={0.21}
        castShadow
      />
    </group>
  );
}

// useGLTF.preload(glbs.t_flower_3_glb);
