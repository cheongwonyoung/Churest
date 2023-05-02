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
    </div>
  );
}
