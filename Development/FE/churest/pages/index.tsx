import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Letter from '../components/churest/LetterCreate';
import Tag from '../components/navbar/Tag';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <p>시작페이지</p>
      <Letter></Letter>
      {/* <Tag memberId={1}></Tag> */}
      <div style={{ width: '500px', height: '100px' }}>
        {/* <Image
          src="https://storage.googleapis.com/churest-bucket/gohome.jpg"
          fill
          alt="enter fill"
          style={{ objectFit: 'cover' }}
        /> */}
      </div>
    </>
  );
}
