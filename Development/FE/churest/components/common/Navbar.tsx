import { loginAtom } from '@/atoms/login';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import NavbarButton from './NavbarButton';
import Notice from '../navbar/Notice';
import { useState } from 'react';
export default function Navbar() {
  const id = useRecoilValue(loginAtom).id;

  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  function closeModalHandler() {
    setIsAlarmOpen(false);
  }

  return (
    <div>
      <Link href={'/garden/' + id} style={{ textDecoration: 'none' }}>
        <NavbarButton image="garden_navbar_img" title="광장" />
      </Link>
      <div onClick={() => setIsAlarmOpen(true)}>
        <NavbarButton image="alarm_navbar_img" title="알림함" />
      </div>
      <NavbarButton image="search_navbar_img" title="친구 검색" />
      <NavbarButton image="tag_navbar_img" title="태그 모아보기" />
      <Link href="/churest" style={{ textDecoration: 'none' }}>
        <NavbarButton image="churest_navbar_img" title="마이 츄레스트" />
      </Link>

      <NavbarButton image="mypage_navbar_img" title="마이페이지" />
      {/* <Link href="/chuworld" style={{ textDecoration: 'none' }}>
        <NavbarButton image="chuworld_navbar_img" title="다른 집 둘러보기" />
      </Link> */}

      <Link href={'/'}>홈</Link>
      <Link href={'/login'}>로그인</Link>
      <Link href={'/signup'}> 회원가입</Link>
      {isAlarmOpen && <Notice memberId={id} onCancel={closeModalHandler} />}
    </div>
  );
}
