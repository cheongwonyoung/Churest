import { loginAtom } from '@/atoms/login';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

export default function Navbar() {
  const id = useRecoilValue(loginAtom).id;

  return (
    <div>
      <Link href={'/'}>홈</Link>
      <Link href={'/login'}>로그인</Link>
      <Link href={'/garden/' + id}>정원</Link>
      <Link href={'/churest'}>츄레스트</Link>
      <Link href={'/memory'}> 추억생성하긔</Link>
      <Link href={'/chuworld'}>츄월드</Link>
    </div>
  );
}
