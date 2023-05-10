import { loginAtom } from '@/atoms/login';
import { useRecoilState, useRecoilValue } from 'recoil';
import {openShopAtom,
  openAlarmAtom,
  openMyPageAtom,
  openSearchAtom,
  openTagAtom,
} from '@/atoms/modal';
import Notice from '@/components/navbar/Notice';
import Tag from '@/components/navbar/Tag';
import ItemShop from '@/components/navbar/ItemShop';
import SearchFriend from '@/components/common/SearchFriend';
import MyPage from '@/components/churest/MyPage';
import ModalBlackBg from './ModalBlackBg';

export default function Modals() {
  const id = useRecoilValue(loginAtom).id;
  const [isShopOpen, setIsShopOpen] = useRecoilState(openShopAtom);
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom);
  return (
    <div>      
      {isShopOpen.isModal && (
      <ModalBlackBg
        modal={<ItemShop/>}
        closeModal={() => setIsShopOpen({ isModal: false })}
      />
    )}
      {/* {isAlarmOpen.isModal && <Notice memberId={id} />} */}
      {isAlarmOpen.isModal && (
        <ModalBlackBg
          modal={<Notice memberId={id} />}
          closeModal={() => setIsAlarmOpen({ isModal: false })}
        />
      )}
      {/* {isTagOpen.isModal && <Tag memberId={id} />} */}
      {isTagOpen.isModal && (
        <ModalBlackBg
          modal={<Tag memberId={id} />}
          closeModal={() => setIsTagOpen({ isModal: false })}
        />
      )}
      {/* {isSearchOpen.isModal && <SearchFriend />} */}
      {isSearchOpen.isModal && (
        <ModalBlackBg
          modal={<SearchFriend />}
          closeModal={() => setIsSearchOpen({ isModal: false })}
        />
      )}
      {/* {isMyPageOpen.isModal && <MyPage />} */}
      {isMyPageOpen.isModal && (
        <ModalBlackBg
          modal={<MyPage />}
          closeModal={() => setIsMyPageOpen({ isModal: false })}
        />
      )}
    </div>
  );
}
