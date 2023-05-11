import { loginAtom } from '@/atoms/login';
import { useRecoilState, useRecoilValue } from 'recoil';
import NavbarButton from '../common/NavbarButton';
import {
  openAlarmAtom,
  openMyPageAtom,
  openSearchAtom,
  openTagAtom,
} from '@/atoms/modal';
import { useRouter } from 'next/router';

export default function SquareNavbar() {
  const id = useRecoilValue(loginAtom).id;
  const router = useRouter();
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom);

  return (
    <div className="navbarContainer">
      {/* 1. 마이츄레스트   */}
      <div
        onClick={() => {
          router.push('/churest/' + id);
        }}
      >
        <NavbarButton image="churest_navbar_img" title="마이 츄레스트" />
      </div>

      {/* 2. 친구 검색  */}
      <div
        onClick={() => {
          setIsSearchOpen({ isModal: true });
        }}
      >
        <NavbarButton image="search_navbar_img" title="친구 검색" />
      </div>

      {/* 3. 알림함  */}
      <div
        onClick={() => {
          setIsAlarmOpen({ isModal: true });
        }}
      >
        <NavbarButton image="alarm_navbar_img" title="알림함" />
      </div>

      {/* 4. 태그 모아보기  */}
      <div
        onClick={() => {
          setIsTagOpen({ isModal: true });
        }}
      >
        <NavbarButton image="tag_navbar_img" title="태그 모아보기" />
      </div>

      {/* 5. 마이페이지    */}
      <div
        onClick={() => {
          setIsMyPageOpen({ isModal: true });
        }}
      >
        <NavbarButton image="mypage_navbar_img" title="마이페이지" />
      </div>

      {/* 6. 츄월드  */}
      <div
        onClick={() => {
          router.push('/chuworld/' + id);
        }}
      >
        <NavbarButton image="chuworld_navbar_img" title="츄월드" />
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
