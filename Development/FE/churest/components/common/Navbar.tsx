import Link from 'next/link';

export default function Navbar() {
  return (
    <div>
      <Link href={'/'}>홈</Link>
      <Link href={'/login'}>로그인</Link>
      <Link href={'/churest'}>츄레스트</Link>
      <Link href={'/signup'}>회원가입</Link>
    </div>
  );
}
