import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <p>시작페이지</p>
      {/* <Image
        src="https://storage.cloud.google.com/churest-bucket/%EB%B6%84%EB%B9%84%EB%82%98%EB%AC%B4.jpg"
        width={100}
        height={100}
        alt="enter image"
      /> */}
    </>
  );
}
