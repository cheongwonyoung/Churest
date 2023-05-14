import { loginAtom } from '@/atoms/login';
import { useRecoilState, useRecoilValue } from 'recoil';
import NavbarButton from './NavbarButton';
import {
  openAlarmAtom,
  openMyPageAtom,
  openSearchAtom,
  openTagAtom,
  openShopAtom,
} from '@/atoms/modal';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getAlarm } from '@/apis/alarm';
import { useEffect } from 'react';
type Props = {
  types: string;
};
export default function Navbar({ types }: Props) {
  const id = useRecoilValue(loginAtom).id;
  // square , chuworld, churest
  const router = useRouter();
  const params = Number(router.query.id);

  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom);
  const [isShopOpen, setIsShopOpen] = useRecoilState(openShopAtom);

  const { data, refetch } = useQuery('getNotice', () => getAlarm(id));
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="navbarContainer">
      {/* 0. 상점  */}
      <div
        onClick={() => {
          setIsShopOpen({ isModal: true });
        }}
      >
        <NavbarButton image="shop_navbar_img" title="상점" />
      </div>

      {/* 1. 광장  */}
      {types == 'square' ? null : (
        <div
          onClick={() => {
            router.push('/square');
          }}
        >
          <NavbarButton image="garden_navbar_img" title="광장" />
        </div>
      )}

      {/* 2. 마이츄레스트 , 단 내 츄레스트일 때는 안보이게  */}
      {types == 'churest' ? (
        params !== id && (
          <div
            onClick={() => {
              router.push('/churest/' + id);
            }}
          >
            <NavbarButton image="churest_navbar_img" title="마이 츄레스트" />
          </div>
        )
      ) : (
        <div
          onClick={() => {
            router.push('/churest/' + id);
          }}
        >
          <NavbarButton image="churest_navbar_img" title="마이 츄레스트" />
        </div>
      )}

      {/* 3. 친구 검색  */}
      <div
        onClick={() => {
          setIsSearchOpen({ isModal: true });
        }}
      >
        <NavbarButton image="search_navbar_img" title="친구 검색" />
      </div>

      {/* 4. 알림함  */}
      <div
        onClick={() => {
          setIsAlarmOpen({ isModal: true });
        }}
      >
        {data?.data.length ? (
          <NavbarButton image="alarm_navbar_img" title="알림함" />
        ) : (
          // 여기에 그 ping 한 머시기
          <NavbarButton image="alarm_navbar_img" title="알림" />
        )}
      </div>

      {/* 5. 태그 모아보기  */}
      <div
        onClick={() => {
          setIsTagOpen({ isModal: true });
        }}
      >
        <NavbarButton image="tag_navbar_img" title="태그 모아보기" />
      </div>

      {/* 6. 마이페이지    */}
      <div
        onClick={() => {
          setIsMyPageOpen({ isModal: true });
        }}
      >
        <NavbarButton image="mypage_navbar_img" title="마이페이지" />
      </div>

      {/* 7. 츄월드  */}
      {types == 'chuworld' ? null : (
        <div
          onClick={() => {
            router.push('/chuworld/' + id);
          }}
        >
          <NavbarButton image="chuworld_navbar_img" title="츄월드" />
        </div>
      )}

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
