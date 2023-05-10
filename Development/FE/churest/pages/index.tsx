import Link from 'next/link';
import { loginAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const id = useRecoilValue(loginAtom).id;
  return (
    <>
      <p>임 시 시 작 페 이 쥐 바 꿔 주 세 용</p>
      <Link href={'/'}>홈</Link>
      <br />
      <Link href={'/login'}>로그인</Link>
      <br />
      <Link href={'/signup'}> 회원가입</Link>
      <br />
      <Link href={'/churest/' + id}>츄레스트</Link>

    </>
  );
}
