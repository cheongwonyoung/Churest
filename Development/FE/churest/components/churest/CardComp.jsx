import Styles from './CardStyle.module.css';
import React, { useState } from 'react';
import Image from 'next/image';
import { useSpring, animated } from 'react-spring';
// import { useSpring } from 'react-spring';
import dynamic from 'next/dynamic';

// const animated = dynamic(() => import('react-spring'), { ssr: false });

export default function CardComp({ imagen }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
    boxShadow: show
      ? '0 20px 25px rgb(0 0 0 / 25%)'
      : '0 2px 10px rgb(0 0 0 / 8%)',
  });
  return (
    <>
      <animated.div
        className={Styles.card}
        style={props3}
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <Image src={imagen} alt="" width={300} height={300} />
      </animated.div>
      <style jsx>{``}</style>
    </>
  );
}
