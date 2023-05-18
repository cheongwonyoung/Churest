import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useRef, useEffect, useState } from 'react';
import { OrbitControls, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { Char1 } from '../3DFiles/Character/Char1';
import { Char4 } from '../3DFiles/Character/Char4';
import { Char2 } from '../3DFiles/Character/Char2';
import { Char3 } from '../3DFiles/Character/Char3';
import { Char5 } from '../3DFiles/Character/Char5';
import { Char6 } from '../3DFiles/Character/Char6';
import { Controls } from './Churest3D';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import { movingAtom } from '@/atoms/inp';
import { createArticleAtom } from '@/atoms/modal';

type Props = {
  autoView: boolean;
  spaceModal(): void;
  resetPosition: boolean;
};

export default function CharacterChurest({
  autoView,
  spaceModal,
  resetPosition,
}: Props) {
  const man1 = useRef<any>();
  const isSelect = useRecoilValue(createArticleAtom).isSelect;

  const [isFloor, setIsFloor] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      const key = e.code;
      key == 'ShiftLeft' && setCharState('Run');
    });
    document.addEventListener('keyup', (e) => {
      const key = e.code;
      key == 'ShiftLeft' && setCharState('Walk');
    });
  }, []);

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );

  useEffect(() => {
    if (!isSelect) {
      man1.current.setTranslation({ x: 0, y: 8, z: 4 });
      man1.current.setLinvel({ x: 0, y: 0, z: 0 });

      setIsFloor(false);
    }
  }, [resetPosition]);
  const isInp = useRecoilValue(movingAtom);
  // 캐릭터 이동
  const handleMovement = () => {
    let move = 4;
    if (charState == 'Run') move = 8;
    if (isFloor && !isInp && !isSelect) {
      if (rightPressed && forwardPressed) {
        man1.current.setLinvel({ x: move / 2, y: -2, z: -move / 2 });
      } else if (forwardPressed && leftPressed) {
        man1.current.setLinvel({ x: -move / 2, y: -2, z: -move / 2 });
      } else if (leftPressed && backPressed) {
        man1.current.setLinvel({ x: -move / 2, y: -2, z: move / 2 });
      } else if (rightPressed && backPressed) {
        man1.current.setLinvel({ x: move / 2, y: -2, z: move / 2 });
      } else if (rightPressed) {
        man1.current.setLinvel({ x: move, y: -2, z: 0 });
      } else if (leftPressed) {
        man1.current.setLinvel({ x: -move, y: -2, z: 0 });
      } else if (forwardPressed) {
        man1.current.setLinvel({ x: 0, y: -2, z: -move });
      } else if (backPressed) {
        man1.current.setLinvel({ x: 0, y: -2, z: move });
      }
    }
  };

  //캐릭터 보는 방향
  const handleLookAt = () => {
    if (!isInp) {
      if (rightPressed && forwardPressed) {
        setLook((Math.PI * 3) / 4);
      } else if (forwardPressed && leftPressed) {
        setLook((Math.PI * 5) / 4);
      } else if (leftPressed && backPressed) {
        setLook(-Math.PI / 4);
      } else if (backPressed && rightPressed) {
        setLook(Math.PI / 4);
      } else if (rightPressed) {
        setLook(Math.PI / 2);
      } else if (leftPressed) {
        setLook(-Math.PI / 2);
      } else if (forwardPressed) {
        setLook(Math.PI);
      } else if (backPressed) {
        setLook(0);
      }
    }
  };

  const [look, setLook] = useState(0);
  useFrame(() => {
    if (jumpPressed && !isInp) {
      spaceModal();
    }
    if (man1.current?.translation().y < -15) {
      man1.current.setTranslation({ x: 0, y: 8, z: 4 });
      man1.current.setLinvel({ x: 0, y: 0, z: 0 });
      setIsFloor(false);
    }

    autoView && !isSelect && updateCameraTarget();
    handleMovement();
    handleLookAt();
  });

  const controlRef = useRef<any>();
  useEffect(() => {
    console.log(isSelect);
    if (isSelect) {
      camera.position.y = 43;
      camera.position.z = 0;
      camera.position.x = 0;
      setIsFloor(false);
      // for (let time = 30; time > 0; time++) {
      //   camera.position.x = time;
      // }
      cameraTarget.x = 0;
      cameraTarget.y = 0;
      cameraTarget.z = 0;
      if (controlRef.current) controlRef.current.target = cameraTarget;
    }
  }, [isSelect]);
  let cameraTarget = new THREE.Vector3();
  const camera = useThree((state) => state.camera);
  console.log('카메라', camera);
  const updateCameraTarget = () => {
    camera.position.x = man1.current.translation().x;
    // camera.position.z = camera.position.z;
    camera.position.z = man1.current.translation().z + 5;
    camera.position.y = man1.current.translation().y + 3;
    cameraTarget.x = man1.current.translation().x;
    cameraTarget.y = man1.current.translation().y;
    cameraTarget.z = man1.current.translation().z;
    if (controlRef.current) controlRef.current.target = cameraTarget;
  };

  const [charState, setCharState] = useState('Walk');
  const avatarId = useRecoilValue(loginAtom).avatarId;

  const character = () => {
    switch (avatarId) {
      case 1:
        return (
          <Char1
            isMoving={
              (forwardPressed || backPressed || rightPressed || leftPressed) &&
              !isInp
            }
            charState={charState}
          />
        );
      case 2:
        return (
          <Char2
            isMoving={
              (forwardPressed || backPressed || rightPressed || leftPressed) &&
              !isInp
            }
            charState={charState}
          />
        );
      case 3:
        return (
          <Char3
            isMoving={
              (forwardPressed || backPressed || rightPressed || leftPressed) &&
              !isInp
            }
            charState={charState}
          />
        );
      case 4:
        return (
          <Char4
            isMoving={
              (forwardPressed || backPressed || rightPressed || leftPressed) &&
              !isInp
            }
            charState={charState}
          />
        );
      case 5:
        return (
          <Char5
            isMoving={
              (forwardPressed || backPressed || rightPressed || leftPressed) &&
              !isInp
            }
            charState={charState}
          />
        );
      case 6:
        return (
          <Char6
            isMoving={
              (forwardPressed || backPressed || rightPressed || leftPressed) &&
              !isInp
            }
            charState={charState}
          />
        );
    }
  };

  return (
    <>
      <OrbitControls ref={controlRef} enableRotate={false} />
      {!isSelect && (
        <RigidBody
          position={[0, 8, 4]}
          name="character"
          ref={man1}
          canSleep={false}
          colliders="cuboid"
          enabledRotations={[false, false, false]}
          onCollisionEnter={({ other }) => {
            if (other.colliderObject?.name == 'map') setIsFloor(true);
          }}
          onIntersectionExit={({ other }) => {
            other.colliderObject?.name == 'mapSensor' && setIsFloor(false);
          }}
          rotation={[0, look, 0]}
        >
          {character()}
        </RigidBody>
      )}
    </>
  );
}
