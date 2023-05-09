import { loginAtom } from '@/atoms/login';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import NavbarButton from './NavbarButton';
import {
  openAlarmAtom,
  openMyPageAtom,
  openSearchAtom,
  openTagAtom,
} from '@/atoms/modal';

export default function ChuWorldNavbar() {
  const id = useRecoilValue(loginAtom).id;
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom);

  return (
    <div className="navbarContainer">
      {/* 1. 알림함  */}
      <div
        onClick={() => {
          setIsAlarmOpen({ isModal: true });
        }}
      >
        <NavbarButton image="alarm_navbar_img" title="알림함" />
      </div>
      {/* 2. 광장   */}
      <Link href={'/churest/' + id} style={{ textDecoration: 'none' }}>
        <NavbarButton image="garden_navbar_img" title="광장" />
      </Link>
      {/* 3. 친구 검색  */}
      <div
        onClick={() => {
          setIsSearchOpen({ isModal: true });
        }}
      >
        <NavbarButton image="search_navbar_img" title="친구 검색" />
      </div>
      {/* 4. 태그 모아보기  */}
      <div
        onClick={() => {
          setIsTagOpen({ isModal: true });
        }}
      >
        <NavbarButton image="tag_navbar_img" title="태그 모아보기" />
      </div>
      {/* 5. 마이 츄레스트  */}
      <Link href={'/churest/' + id} style={{ textDecoration: 'none' }}>
        <NavbarButton image="churest_navbar_img" title="마이 츄레스트" />
      </Link>
      {/* 6. 마이페이지    */}
      <div
        onClick={() => {
          setIsMyPageOpen({ isModal: true });
        }}
      >
        <NavbarButton image="mypage_navbar_img" title="마이페이지" />
      </div>

      <style jsx>
        {`
          .navbarContainer {
            z-index: 100;
            position: absolute;
            right: 0;
          }
        `}
      </style>
    </div>
  );
}
