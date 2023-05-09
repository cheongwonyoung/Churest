import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { House1 } from '../3DFiles/House/House_1';
import { House2 } from '../3DFiles/House/House_2';
import { House3 } from '../3DFiles/House/House_3';
import { House4 } from '../3DFiles/House/House_4';
import { House5 } from '../3DFiles/House/House_5';
import { Html } from '@react-three/drei';

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
      {/* <House1 /> */}
      <House5 scale={0.3} />
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

  return (
    <>
      <Box text={<span>10태집</span>} />
      <Box
        text={<span>채리집</span>}
        position={[0, -0.25 * viewport.height, 0]}
      />
      <Box
        text={<span>윤두집</span>}
        position={[0, -0.5 * viewport.height, 0]}
      />
      <Box
        text={<span>서니집</span>}
        position={[0, -0.75 * viewport.height, 0]}
      />
      <Box
        text={<span>서여늬집</span>}
        position={[0, -1 * viewport.height, 0]}
      />
    </>
  );
}

export default function ChuWorldItem() {
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
