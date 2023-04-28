import Link from 'next/link';

export default function Navbar() {
  return (
    <div>
      <Link href={'/'}>홈</Link>
      <Link href={'/login'}>로그인</Link>
    </div>
  );
}
