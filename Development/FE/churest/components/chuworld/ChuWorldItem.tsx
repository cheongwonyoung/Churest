import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface BoxProps {
  text: React.ReactNode;
  color: string;
  position?: [number, number, number];
}

function Box({ text, color, position = [0, 0, 0], ...props }: BoxProps) {
  const [hovered, set] = useState(false);
  return (
    <mesh
      {...props}
      onPointerOver={(e) => set(true)}
      onPointerOut={(e) => set(false)}
      position={position}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
      <Html position={[0, 0, 1]} className="label" center>
        {text}
      </Html>
    </mesh>
  );
}

interface ScrollContainerProps {
  scroll: React.MutableRefObject<number>;
  children: React.ReactNode;
}

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

function Scene() {
  const viewport = useThree((state) => state.viewport);
  return (
    <>
      <Box text={<span>This is HTML</span>} color="aquamarine" />
      <Box
        text={<h1>H1 caption</h1>}
        color="lightblue"
        position={[0, -viewport.height, 0]}
      />
    </>
  );
}

export default function ChuWorldItem() {
  const scrollRef = useRef<HTMLDivElement>(null!);
  const scroll = useRef<number>(0);
  return (
    <>
      <Canvas
        eventSource={document.getElementById('root')!}
        eventPrefix="client"
      >
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

          h1 {
            font-size: 3em;
            letter-spacing: -3px;
            line-height: 0.7em;
          }
        `}
      </style>
    </>
  );
}
