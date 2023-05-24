import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    Circle006_Circle007_Material001_0: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
  };
};

export function WhiteFlower(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.flower_white_glb) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.12}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-12.33, 25.21, 6.35]} scale={20}>
            <mesh
              geometry={nodes.Circle006_Circle007_Material001_0.geometry}
              material={materials['Material.001']}
              position={[0.09, -0.03, -0.09]}
              castShadow
            />
          </group>
        </group>
      </group>
    </group>
  );
}

// useGLTF.preload(glbs.flower_white_glb);
