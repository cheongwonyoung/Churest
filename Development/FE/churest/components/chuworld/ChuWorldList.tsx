import ChuWorldHouse from './ChuWorldHouse';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import ChuWorldLight from './ChuWorldLight';
import { OrbitControls, ScrollControls } from '@react-three/drei';
import { Scroll } from '@react-three/drei';
import * as THREE from 'three';
import { useState, useEffect, useMemo, useRef } from 'react';
import ChuWorldHouses from './ChuWorldHouses';
type MyInfo = {
  memberId: number;
  nickname: string;
  houseId: number;
};
type Props = {
  data: any;
  xPosition?: number;
};

export default function ChuWorldList({ data }: Props) {
  const [xPosition, setXPosition] = useState(0);
  const [possible, setPossible] = useState(true);
  const step = useRef(0);
  const wheelAction = (e: any) => {
    if (e.deltaY < 0 && step.current < 5 && step.current > 0) {
      step.current = step.current - 1;
    } else if (e.deltaY > 0 && step.current >= 0 && step.current < 4) {
      step.current = step.current + 1;
    } else {
      return;
    }
  };
  let timer: any = null;

  useEffect(() => {
    document.addEventListener('wheel', (e) => {
      if (timer == null) {
        timer = setTimeout(() => {
          timer = null;
          wheelAction(e);
        }, 300);
      }
    });
  }, []);

  useFrame(() => {
    if (xPosition < step.current * 8) {
      setXPosition((prev) => prev + 0.5);
    } else if (xPosition > step.current * 8) {
      setXPosition((prev) => prev - 0.5);
    } else {
      setPossible(true);
    }
  });

  return (
    <>
      <ChuWorldHouses data={data} xPosition={xPosition} />
      <ChuWorldLight />
    </>
  );
}
