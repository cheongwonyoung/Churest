import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { House_1 } from '../3DFiles/House_1';
import { House_2 } from '../3DFiles/House_2';
import { House_3 } from '../3DFiles/House_3';
import { House_4 } from '../3DFiles/House_4';
import { House_5 } from '../3DFiles/House_5';
// import { images } from '@/public/assets/images';
// import Image from 'next/image';
// import { getChuworld } from '@/apis/chuworld';
// import { useQuery } from 'react-query';
// import { useRecoilValue } from 'recoil';
// import loginAtom from '../../atoms/login';

interface BoxProps {
  text: React.ReactNode;
  position?: [number, number, number];
}

function Box({ text, position = [0, 0, 0], ...props }: BoxProps) {
  const [hovered, set] = useState(false);

  return (
    <mesh
      {...props}
      onPointerOver={(e) => set(true)}
      onPointerOut={(e) => set(false)}
      position={position}
    >
      {/* <House_1 rotation={[0, Math.PI, 0]} /> */}
      {/* <House_2 scale={0.3} /> */}
      {/* <House_3 scale={0.3} /> */}
      {/* <House_4 scale={0.3} /> */}
      <House_5 scale={0.3} />
      {/* 박스 안에다가 텍스트 넣기  */}
      <Html position={[0, 0, 1]} className="label" center>
        {text}
      </Html>
      {/* box 정의 args 는 크기 지정  */}
      {/* <boxGeometry args={[2, 2, 2]} /> */}
      {/* 색 지정, hover 하면 핑크색으로 바뀜  */}
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : color} /> */}
    </mesh>
  );
}

interface ScrollContainerProps {
  scroll: React.MutableRefObject<number>;
  children: React.ReactNode;
}

// 스크롤 하는 거
function ScrollContainer({ scroll, children }: ScrollContainerProps) {
  const { viewport } = useThree();
  const group = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      viewport.height * scroll.current,
      4,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

// 박스
function Scene() {
  const viewport = useThree((state) => state.viewport);
  const memberId = 1;
  // const { data, isLoading, isError, error } = useQuery('getChuworld', () =>
  //   getChuworld(memberId)
  // );
  // console.log(data);
  return (
    <>
      <Box text={<span>10태집</span>} />
      <Box text={<h1>채리집</h1>} position={[0, -0.5 * viewport.height, 0]} />
      <Box text={<span>윤두집</span>} position={[0, -1 * viewport.height, 0]} />
    </>
  );
}

export default function ChuWorldItem() {
  // const memberId = useRecoilValue(loginAtom).id
  const scrollRef = useRef<HTMLDivElement>(null!);
  const scroll = useRef<number>(0);
  return (
    <>
      <Canvas eventPrefix="client">
        <ambientLight />
        <pointLight position={[10, 0, 10]} />
        <ScrollContainer scroll={scroll}>
          <Scene />
        </ScrollContainer>
      </Canvas>
      <div
        ref={scrollRef}
        onScroll={(e) =>
          (scroll.current =
            e.currentTarget.scrollTop /
            (e.currentTarget.scrollHeight - e.currentTarget.clientHeight))
        }
        className="scroll"
      >
        <div style={{ height: `200vh`, pointerEvents: 'none' }}></div>
      </div>
      <style jsx>
        {`
          * {
            box-sizing: border-box;
          }

          html,
          body,
          #root {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }

          body {
            background: #f0f0f0;
            font-family: 'Inter var', sans-serif;
          }

          .scroll {
            position: absolute;
            width: 100vw;
            height: 100vh;
            overflow-y: auto;
            top: 0;
            left: 0;
          }
        `}
      </style>
    </>
  );
}
