import { loginAtom } from '@/atoms/login';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  letterBoxAtom,
  myBirdAtom,
  openAlarmAtom,
  openMyPageAtom,
  openSearchAtom,
  openTagAtom,
  openShopAtom,
  newBirdAtom
} from '@/atoms/modal';
import Notice from '@/components/navbar/Notice';
import Tag from '@/components/navbar/Tag';
import SearchFriend from '@/components/common/SearchFriend';
import MyPage from '@/components/churest/MyPage';
import ModalBlackBg from './ModalBlackBg';
import LetterBox from '../churest/LetterBox';
import MyBird from '../churest/MyBird';
import ItemShop from '@/components/navbar/ItemShop';
import NewBird from '../churest/NewBird';

export default function Modals() {
  const id = useRecoilValue(loginAtom).id;
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom);
  const [isLetterOpen, setIsLetterOpen] = useRecoilState(letterBoxAtom);
  const [isMyBirdOpen, setIsMyBirdOpen] = useRecoilState(myBirdAtom);
  const [isShopOpen, setIsShopOpen] = useRecoilState(openShopAtom);
  const [isNewBirdOpen, setIsNewBirdOpen] =useRecoilState(newBirdAtom)
  return (
    <div>      
      {isShopOpen.isModal && (
        <ModalBlackBg
          modal={<ItemShop memberId={id}/>}
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
      {isLetterOpen.isModal && (
        <ModalBlackBg
          modal={<LetterBox />}
          closeModal={() => setIsLetterOpen({ isModal: false })}
        />
      )}
      {isMyBirdOpen.isModal && (
        <ModalBlackBg
          modal={<MyBird />}
          closeModal={() => setIsMyBirdOpen({ isModal: false })}
        />
      )}
        {isNewBirdOpen.isModal && (
        <ModalBlackBg 
          modal={<NewBird />}
        closeModal={() => setIsNewBirdOpen({ ...isNewBirdOpen, isModal: false })}
      />)}
    </div>
  );
}
