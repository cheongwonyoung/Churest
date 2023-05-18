import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function ChuWorldLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  const gogo = useThree();
  useEffect(() => {
    directionalLight.position.set(0, 30, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.x = 5 * 1024; // default
    directionalLight.shadow.mapSize.y = 5 * 1024; // defaultw
    directionalLight.shadow.camera.top = 40;
    directionalLight.shadow.camera.bottom = -40;
    directionalLight.shadow.camera.left = -40;
    directionalLight.shadow.camera.right = 40;
    directionalLight.shadow.camera.near = 0.5; // default
    directionalLight.shadow.camera.far = 500; // default
    directionalLight.shadow.radius = 100;
    gogo.scene.add(directionalLight);
  }, []);
  // console.log(directionalLight);

  return <></>;
}
