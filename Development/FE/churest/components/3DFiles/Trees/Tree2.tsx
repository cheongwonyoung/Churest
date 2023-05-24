import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    Mesh004: THREE.Mesh;
    Mesh004_1: THREE.Mesh;
    Mesh004_2: THREE.Mesh;
    큐브: THREE.Mesh;
    큐브001: THREE.Mesh;
    큐브002: THREE.Mesh;
    큐브003: THREE.Mesh;
    큐브004: THREE.Mesh;
  };
  materials: {
    ['Material.003']: THREE.MeshStandardMaterial;
    ['매테리얼.001']: THREE.MeshStandardMaterial;
    ['매테리얼.002']: THREE.MeshStandardMaterial;
    매테리얼: THREE.MeshStandardMaterial;
  };
};

export function Tree2(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.tree_2_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.41, 0.07]} scale={0.2}>
        <mesh
          geometry={nodes.Mesh004.geometry}
          material={materials['Material.003']}
          castShadow
        />
        <mesh
          geometry={nodes.Mesh004_1.geometry}
          material={materials['매테리얼.001']}
          castShadow
        />
        <mesh
          geometry={nodes.Mesh004_2.geometry}
          material={materials['매테리얼.002']}
          castShadow
        />
      </group>
      <mesh
        geometry={nodes.큐브.geometry}
        material={materials.매테리얼}
        position={[-1.45, 2.11, 0.5]}
        scale={[0.43, 0.38, 0.43]}
        castShadow
      />
      <mesh
        geometry={nodes.큐브001.geometry}
        material={materials.매테리얼}
        position={[-0.54, 1.86, -1.39]}
        rotation={[-0.72, 0.77, -0.68]}
        scale={[0.31, 0.28, 0.31]}
        castShadow
      />
      <mesh
        geometry={nodes.큐브002.geometry}
        material={materials.매테리얼}
        position={[1.09, 1.77, -0.49]}
        rotation={[-1.19, 0.41, -0.55]}
        scale={[0.36, 0.32, 0.36]}
        castShadow
      />
      <mesh
        geometry={nodes.큐브003.geometry}
        material={materials.매테리얼}
        position={[1.13, 2.07, 0.65]}
        rotation={[-1.9, 0.34, -1.03]}
        scale={[0.39, 0.35, 0.39]}
        castShadow
      />
      <mesh
        geometry={nodes.큐브004.geometry}
        material={materials.매테리얼}
        position={[0.18, 2.31, 0.85]}
        rotation={[-2.15, 0.8, -1.38]}
        scale={[0.44, 0.39, 0.44]}
        castShadow
      />
    </group>
  );
}
// useGLTF.preload(glbs.tree_2_glb);
