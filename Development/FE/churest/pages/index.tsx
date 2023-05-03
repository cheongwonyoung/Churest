import { Inter } from 'next/font/google';
// import ChuWorldItem from '@/components/chuworld/ChuWorldItem';
import CloudMap from '@/components/chuworld/CloudMap';
import ChuWorldItem from '@/components/chuworld/ChuWorldItem';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <p>시작페이지</p>
      <ChuWorldItem />
    </>
  );
}
