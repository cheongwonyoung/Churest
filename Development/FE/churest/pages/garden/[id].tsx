import { Box, KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo, useState } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import MovingCharacter from '@/components/common/MovingCharacter';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

export default function Garden() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  );

  const [isModal, setIsModal] = useState(false);

  const seongong = (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
      }}
      onClick={() => setIsModal(false)}
    >
      <p style={{ fontSize: '200px' }}>축하합니다! </p>
      <p style={{ fontSize: '200px' }}>성공입니다!</p>
    </div>
  );

  return (
    <div className="gogo">
      {isModal && seongong}
      <KeyboardControls map={map}>
        <Canvas>
          <Suspense>
            <Physics>
              <MovingCharacter />

              <RigidBody colliders="cuboid" name="floor1" type="fixed">
                <Box
                  position={[0, -1, 0]}
                  args={[1, 1, 1]}
                  receiveShadow
                  castShadow
                >
                  <meshStandardMaterial color={'red'} />
                </Box>
              </RigidBody>
              <RigidBody colliders="cuboid" name="floor1">
                <Box
                  position={[4, -1, 7]}
                  args={[1, 1, 1]}
                  receiveShadow
                  castShadow
                >
                  <meshStandardMaterial color={'red'} />
                </Box>
              </RigidBody>
              <RigidBody colliders="cuboid" name="floor1">
                <Box
                  position={[4, -1, 10]}
                  args={[1, 1, 1]}
                  receiveShadow
                  castShadow
                >
                  <meshStandardMaterial color={'red'} />
                </Box>
              </RigidBody>

              <RigidBody colliders="cuboid" name="floor1" type="fixed">
                <Box
                  position={[2, -0.5, 0]}
                  args={[1, 1, 1]}
                  receiveShadow
                  castShadow
                >
                  <meshStandardMaterial color={'red'} />
                </Box>
              </RigidBody>

              <RigidBody colliders="cuboid" name="floor1" type="fixed">
                <Box
                  position={[1, 0, -1]}
                  args={[1, 1, 1]}
                  receiveShadow
                  castShadow
                >
                  <meshStandardMaterial color={'red'} />
                </Box>
              </RigidBody>
              <RigidBody colliders="cuboid" name="floor1" type="fixed">
                <Box
                  position={[1, 0.3, 2]}
                  args={[1, 1, 1]}
                  receiveShadow
                  castShadow
                >
                  <meshStandardMaterial color={'red'} />
                </Box>
              </RigidBody>
              <RigidBody colliders="cuboid" name="floor1" type="fixed">
                <Box
                  position={[-2, 0.6, 2]}
                  args={[1, 1, 1]}
                  receiveShadow
                  castShadow
                >
                  <meshStandardMaterial color={'red'} />
                </Box>
              </RigidBody>
              <RigidBody colliders="cuboid" name="floor1" type="fixed">
                <Box
                  position={[-3, 1, 2]}
                  args={[1, 1, 1]}
                  receiveShadow
                  castShadow
                >
                  <meshStandardMaterial color={'red'} />
                </Box>
              </RigidBody>
              <RigidBody
                colliders="cuboid"
                name="floor1"
                type="fixed"
                onCollisionEnter={() => setIsModal(true)}
              >
                <Box
                  position={[-5, 1, 0]}
                  args={[1, 1, 1]}
                  receiveShadow
                  castShadow
                >
                  <meshStandardMaterial color={'green'} />
                </Box>
              </RigidBody>

              <RigidBody
                colliders="cuboid"
                name="floor1"
                sensor
                onIntersectionEnter={() => {
                  // if (confirm('뭐함')) setPaused(false);
                  // setPaused(false);
                }}
                type="fixed"
              >
                <Box position={[4, -1, 3]} args={[1, 1, 1]}>
                  <meshStandardMaterial />
                </Box>
              </RigidBody>

              <RigidBody
                name="floor2"
                colliders="cuboid"
                type="fixed"
                friction={1}
              >
                <Box position={[0, -2, 0]} args={[40, 0.5, 40]} receiveShadow>
                  <meshStandardMaterial color={'yellow'} />
                </Box>
              </RigidBody>
            </Physics>

            <ambientLight intensity={0.8} />
            <directionalLight castShadow />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <style jsx>
        {`
          .gogo {
            width: 100vw;
            height: 90vh;
          }
        `}
      </style>
    </div>
  );
}
