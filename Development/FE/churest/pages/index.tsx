import Link from 'next/link';
import { loginAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const id = useRecoilValue(loginAtom).id;
  const router = useRouter();
  return (
    <>
      <Link href={'/'}>홈</Link>
      <br />
      <Link href={'/login'}>로그인</Link>
      <br />
      <p className="chu" onClick={() => router.push('/churest/' + id)}>
        츄레스트
      </p>
      <style jsx>
        {`
          .chu {
            cursor: pointer;
          }
          .chu:hover {
            color: red;
          }
        `}
      </style>
    </>
  );
}
