// import { useFrame, useThree } from '@react-three/fiber';
// import { RigidBody } from '@react-three/rapier';
// import { useRef, useEffect, useState } from 'react';
// import { OrbitControls, useKeyboardControls } from '@react-three/drei';
// import * as THREE from 'three';
// import { Char1 } from '../3DFiles/Character/Char1';
// import { Char4 } from '../3DFiles/Character/Char4';
// import { Char2 } from '../3DFiles/Character/Char2';
// import { Char3 } from '../3DFiles/Character/Char3';
// import { Char5 } from '../3DFiles/Character/Char5';
// import { Char6 } from '../3DFiles/Character/Char6';

// type Props = {
//   logSpot(x: number[]): void;
//   autoView: boolean;
// };

// export default function MovingCharacter({ logSpot, autoView }: Props) {
//   const man1 = useRef<any>();

//   const [isFloor, setIsFloor] = useState(false);

//   useEffect(() => {
//     man1.current?.setEnabledRotations(false, false, false);
//     document.addEventListener('keydown', (e) => {
//       const key = e.code;
//       key == 'ShiftLeft' && setCharState('Run');
//     });
//     document.addEventListener('keyup', (e) => {
//       const key = e.code;
//       key == 'ShiftLeft' && setCharState('Walk');
//     });
//   }, []);

//   const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
//   const leftPressed = useKeyboardControls((state) => state[Controls.left]);
//   const rightPressed = useKeyboardControls((state) => state[Controls.right]);
//   const backPressed = useKeyboardControls((state) => state[Controls.back]);
//   const forwardPressed = useKeyboardControls(
//     (state) => state[Controls.forward]
//   );

//   const jump = () => {
//     // man1.current.applyImpulse({ x: 0, y: 2, z: 0 });
//     if (jumpPressed && isFloor) {
//       // man1.current.resetForces(true);
//       setIsFloor(false);
//       console.log(man1.current);
//       // man1.current.setLinvel({ x: 0, y: 8, z: 0 });
//       setCharState('Song Jump');
//     }
//   };

//   const moving = (move: number, jump: boolean) => {
//     jump ? 8 : 0;
//     jump && setIsFloor(false);
//     if (rightPressed && forwardPressed) {
//       man1.current.setLinvel({ x: move / 2, y: jump, z: -move / 2 });
//     } else if (forwardPressed && leftPressed) {
//       man1.current.setLinvel({ x: -move / 2, y: jump, z: -move / 2 });
//     } else if (leftPressed && backPressed) {
//       man1.current.setLinvel({ x: -move / 2, y: jump, z: move / 2 });
//     } else if (rightPressed && backPressed) {
//       man1.current.setLinvel({ x: move / 2, y: jump, z: move / 2 });
//     } else if (rightPressed) {
//       // man1.current.applyImpulse({ x: move, y: 0, z: 0 });
//       man1.current.setLinvel({ x: move, y: jump, z: 0 });
//     } else if (leftPressed) {
//       // man1.current.applyImpulse({ x: -move, y: 0, z: 0 });
//       // man1.current.setTranslation(-0.1, 0, 0);
//       man1.current.setLinvel({ x: -move, y: jump, z: 0 });
//     } else if (forwardPressed) {
//       // man1.current.applyImpulse({ x: 0, y: 0, z: -move });
//       // man1.current.setTranslation(0, 0, -0.1);
//       man1.current.setLinvel({ x: 0, y: jump, z: -move });
//     } else if (backPressed) {
//       // man1.current.applyImpulse({ x: 0, y: 0, z: move });
//       // man1.current.setTranslation(0, 0, 0.1);
//       man1.current.setLinvel({ x: 0, y: jump, z: move });
//     } else if (jumpPressed) {
//       man1.current.setLinvel({ x: 0, y: jump, z: 0 });
//     }
//   };

//   // 캐릭터 이동
//   const handleMovement = () => {
//     jump();
//     let move = 4;
//     console.log(isFloor);
//     if (charState == 'Run') move = 8;
//     if (isFloor) {
//       jumpPressed ? moving(move, true) : moving(move, false);
//       // if (rightPressed && forwardPressed) {
//       //   man1.current.setLinvel({ x: move / 2, y: 0, z: -move / 2 });
//       // } else if (forwardPressed && leftPressed) {
//       //   man1.current.setLinvel({ x: -move / 2, y: 0, z: -move / 2 });
//       // } else if (leftPressed && backPressed) {
//       //   man1.current.setLinvel({ x: -move / 2, y: 0, z: move / 2 });
//       // } else if (rightPressed && backPressed) {
//       //   man1.current.setLinvel({ x: move / 2, y: 0, z: move / 2 });
//       // } else if (rightPressed) {
//       //   // man1.current.applyImpulse({ x: move, y: 0, z: 0 });
//       //   man1.current.setLinvel({ x: move, y: 0, z: 0 });
//       // } else if (leftPressed) {
//       //   // man1.current.applyImpulse({ x: -move, y: 0, z: 0 });
//       //   // man1.current.setTranslation(-0.1, 0, 0);
//       //   man1.current.setLinvel({ x: -move, y: 0, z: 0 });
//       // } else if (forwardPressed) {
//       //   // man1.current.applyImpulse({ x: 0, y: 0, z: -move });
//       //   // man1.current.setTranslation(0, 0, -0.1);
//       //   man1.current.setLinvel({ x: 0, y: 0, z: -move });
//       // } else if (backPressed) {
//       //   // man1.current.applyImpulse({ x: 0, y: 0, z: move });
//       //   // man1.current.setTranslation(0, 0, 0.1);
//       //   man1.current.setLinvel({ x: 0, y: 0, z: move });
//       // }
//     }

//     logSpot(man1.current?.translation());
//   };

//   //캐릭터 보는 방향
//   const handleLookAt = () => {
//     if (rightPressed && forwardPressed) {
//       setLook((Math.PI * 3) / 4);
//     } else if (forwardPressed && leftPressed) {
//       setLook((Math.PI * 5) / 4);
//     } else if (leftPressed && backPressed) {
//       setLook(-Math.PI / 4);
//     } else if (backPressed && rightPressed) {
//       setLook(Math.PI / 4);
//     } else if (rightPressed) {
//       setLook(Math.PI / 2);
//     } else if (leftPressed) {
//       setLook(-Math.PI / 2);
//     } else if (forwardPressed) {
//       setLook(Math.PI);
//     } else if (backPressed) {
//       setLook(0);
//     }
//   };

//   const [look, setLook] = useState(0);
//   useFrame((a, b, c) => {
//     jump();

//     if (man1.current?.translation().y < -5) {
//       man1.current.setTranslation({ x: 0, y: 0, z: 0 });
//     }

//     autoView && updateCameraTarget();
//     handleMovement();
//     handleLookAt();
//   });

//   const controlRef = useRef<typeof OrbitControls>();

//   let cameraTarget = new THREE.Vector3();
//   const camera = useThree((state) => state.camera);
//   const updateCameraTarget = () => {
//     camera.position.x = man1.current.translation().x;
//     camera.position.z = man1.current.translation().z + 5;
//     camera.position.y = man1.current.translation().y + 5;

//     cameraTarget.x = man1.current.translation().x;
//     cameraTarget.y = man1.current.translation().y;
//     cameraTarget.z = man1.current.translation().z;
//     if (controlRef.current) controlRef.current.target = cameraTarget;
//   };

//   const [charState, setCharState] = useState('Walk');

//   return (
//     <>
//       <OrbitControls ref={controlRef} />
//       <RigidBody
//         position={[0, 8, 0]}
//         ref={man1}
//         canSleep={false}
//         colliders="cuboid"
//         onCollisionEnter={({ other }) => {
//           setCharState('Walk');
//           setIsFloor(true);
//         }}
//         onCollisionExit={({ other }) => {
//           if (other.rigidBodyObject?.name.includes('floor2')) {
//             setIsFloor(false);
//             console.log('착지');
//           }
//         }}
//         rotation={[0, look, 0]}
//       >
//         {/* <Man1
//           isMoving={
//             forwardPressed || backPressed || rightPressed || leftPressed
//           }
//           charState={charState}
//         /> */}
//         {/* <Char1
//           isMoving={
//             forwardPressed || backPressed || rightPressed || leftPressed
//           }
//           charState={charState}
//         /> */}
//         {/* <Char2
//           isMoving={
//             forwardPressed || backPressed || rightPressed || leftPressed
//           }
//           charState={charState}
//         />
//         <Char3
//           isMoving={
//             forwardPressed || backPressed || rightPressed || leftPressed
//           }
//           charState={charState}
//         />
//         <Char4
//           isMoving={
//             forwardPressed || backPressed || rightPressed || leftPressed
//           }
//           charState={charState}
//         />
//         <Char5
//           isMoving={
//             forwardPressed || backPressed || rightPressed || leftPressed
//           }
//           charState={charState}
//         /> */}
//         <Char6
//           isMoving={
//             forwardPressed || backPressed || rightPressed || leftPressed
//           }
//           charState={charState}
//         />
//       </RigidBody>
//     </>
//   );
// }
