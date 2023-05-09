import { loginAtom } from '@/atoms/login';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  openAlarmAtom,
  openMyPageAtom,
  openSearchAtom,
  openTagAtom,
} from '@/atoms/modal';
import Notice from '@/components/navbar/Notice';
import Tag from '@/components/navbar/Tag';
import SearchFriend from '@/components/common/SearchFriend';
import MyPage from '@/components/churest/MyPage';

export default function Modals() {
  const id = useRecoilValue(loginAtom).id;
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom);
  return (
    <div>
      {isAlarmOpen.isModal && <Notice memberId={id} />}
      {isTagOpen.isModal && <Tag memberId={id} />}
      {isSearchOpen.isModal && <SearchFriend />}
      {isMyPageOpen.isModal && <MyPage />}
    </div>
  );
}
