import { OrbitControls, useKeyboardControls } from '@react-three/drei';
import { Char1 } from '../3DFiles/Character/Char1';
import { Char2 } from '../3DFiles/Character/Char2';
import { Char3 } from '../3DFiles/Character/Char3';
import { Char4 } from '../3DFiles/Character/Char4';
import { Char5 } from '../3DFiles/Character/Char5';
import { Char6 } from '../3DFiles/Character/Char6';
import { loginAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  finish: boolean;
  startNum: number;
};

export default function CharacterGame1({ finish, startNum }: Props) {
  const man1 = useRef<any>();
  const avatarId = useRecoilValue(loginAtom).avatarId;
  const runPressed = true;
  const [charState, setCharState] = useState('Idle');
  const character = () => {
    switch (avatarId) {
      case 1:
        return <Char1 isMoving={runPressed} charState={charState} />;
      case 2:
        return <Char2 isMoving={runPressed} charState={charState} />;
      case 3:
        return <Char3 isMoving={runPressed} charState={charState} />;
      case 4:
        return <Char4 isMoving={runPressed} charState={charState} />;
      case 5:
        return <Char5 isMoving={runPressed} charState={charState} />;
      case 6:
        return <Char6 isMoving={runPressed} charState={charState} />;
    }
  };
  useEffect(() => {
    if (finish == false) {
      man1.current.setTranslation({ x: 2.3, y: 0, z: 1 });
      man1.current.setLinvel({ x: 0, y: 0, z: 0 });
    }
  }, [finish]);

  const handleMovement = (e: any) => {
    if (e.code == 'Space' && !finish && startNum < 1) {
      man1.current?.applyImpulse({ x: 5, y: 0, z: 0 });
    }
  };
  const controlRef = useRef<any>();

  const camera = useThree((state) => state.camera);
  let cameraTarget = new THREE.Vector3();

  const updateCameraTarget = () => {
    camera.position.x = man1.current.translation().x;
    camera.position.z = man1.current.translation().z + 10;
    camera.position.y = man1.current.translation().y + 10;
    cameraTarget.x = man1.current.translation().x;
    cameraTarget.y = man1.current.translation().y;
    cameraTarget.z = man1.current.translation().z;
    if (controlRef.current) controlRef.current.target = cameraTarget;
  };

  useFrame(() => {
    updateCameraTarget();
    if (man1.current.linvel().x > 0) {
      setCharState('Run');
    } else {
      setCharState('Idle');
    }
  });

  useEffect(() => {
    document.addEventListener('keyup', handleMovement);
    return () => {
      document.removeEventListener('keyup', handleMovement);
    };
  });

  return (
    <>
      <OrbitControls ref={controlRef} />
      <RigidBody
        position={[2.3, 0, 1]}
        scale={2}
        name="character"
        ref={man1}
        canSleep={false}
        colliders="cuboid"
        enabledRotations={[false, false, false]}
        rotation={[0, Math.PI / 2, 0]}
      >
        {character()}
      </RigidBody>
    </>
  );
}
