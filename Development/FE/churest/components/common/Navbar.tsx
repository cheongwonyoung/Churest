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

export default function Navbar() {
  const id = useRecoilValue(loginAtom).id;
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom);

  return (
    <div className="navbarContainer">
      <Link href={'/churest/' + id} style={{ color: 'black', textDecoration: 'none' }}>
        <NavbarButton image="garden_navbar_img" title="광장" />
      </Link>

      <div
        onClick={() => {
          setIsAlarmOpen({ isModal: true });
        }}
      >
        <NavbarButton image="alarm_navbar_img" title="알림함" />
      </div>

      <div
        onClick={() => {
          setIsSearchOpen({ isModal: true });
        }}
      >
        <NavbarButton image="search_navbar_img" title="친구 검색" />
      </div>

      <div
        onClick={() => {
          setIsTagOpen({ isModal: true });
        }}
      >
        <NavbarButton image="tag_navbar_img" title="태그 모아보기" />
      </div>

      <Link href={'/churest/' + id} style={{ color: 'black', textDecoration: 'none' }}>
        <NavbarButton image="churest_navbar_img" title="마이 츄레스트" />
      </Link>

      <div
        onClick={() => {
          setIsMyPageOpen({ isModal: true });
        }}
      >
        <NavbarButton image="mypage_navbar_img" title="마이페이지" />
      </div>

      <Link href={'/chuworld/' + id} style={{ color: 'black', textDecoration: 'none' }}>
        <NavbarButton image="chuworld_navbar_img" title="츄월드" />
      </Link>
      <style jsx>
        {`
          .navbarContainer {
            z-index: 100;
            position: absolute;
            right: 0;
            padding: 7px 7px 7px 7px;
            display: flex;
            flex-direction: column;
            gap: 7px;
          }
        `}
      </style>
    </div>
  );
}
