import { loginAtom } from '@/atoms/login';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  letterBoxAtom,
  myBirdAtom,
  myTreeAtom,
  openAlarmAtom,
  openMyPageAtom,
  openSearchAtom,
  openTagAtom,
  openShopAtom,
  newBirdAtom,
  createArticleAtom,
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
import CreateArticle from '../churest/CreateArticle';
import MemoryView from '../churest/MemoryView';
import CreateBoox from '../churest/CreateBoox';

export default function Modals() {
  const id = useRecoilValue(loginAtom).id;
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom); // 알림함 모달
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom); // 태그 모아보기 모달
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom); // 친구 검색 모달
  const [isMyPageOpen, setIsMyPageOpen] = useRecoilState(openMyPageAtom); // 마이페이지 모달
  const [isLetterOpen, setIsLetterOpen] = useRecoilState(letterBoxAtom); // 우편함 모달
  const [isMyBirdOpen, setIsMyBirdOpen] = useRecoilState(myBirdAtom); // 나의 새 모달
  const [isShopOpen, setIsShopOpen] = useRecoilState(openShopAtom); // 상점 모달
  const [isNewBirdOpen, setIsNewBirdOpen] = useRecoilState(newBirdAtom); // 새 구입 모달
  const [isCreate, setIsCreate] = useRecoilState(createArticleAtom); // 추억 생성 모달
  const [isMyTreeOpen, setIsMyTreeOpen] = useRecoilState(myTreeAtom); // 추억 나무 조회

  return (
    <div>
      {isShopOpen.isModal && (
        <ModalBlackBg
          modal={<ItemShop memberId={id} />}
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
      {/* 태그 모아보기 모달 */}
      {/* {isTagOpen.isModal && <Tag memberId={id} />} */}
      {isTagOpen.isModal && (
        <ModalBlackBg
          modal={<Tag memberId={id} />}
          closeModal={() => setIsTagOpen({ isModal: false })}
        />
      )}
      {/* 친구 검색 모달 */}
      {/* {isSearchOpen.isModal && <SearchFriend />} */}
      {isSearchOpen.isModal && (
        <ModalBlackBg
          modal={<SearchFriend />}
          closeModal={() => setIsSearchOpen({ isModal: false })}
        />
      )}
      {/* 마이페이지 모달 */}
      {/* {isMyPageOpen.isModal && <MyPage />} */}
      {isMyPageOpen.isModal && (
        <ModalBlackBg
          modal={<MyPage />}
          closeModal={() => setIsMyPageOpen({ isModal: false })}
        />
      )}
      {/* 우체통 모달 */}
      {isLetterOpen.isModal && (
        <ModalBlackBg
          modal={<LetterBox />}
          closeModal={() => setIsLetterOpen({ isModal: false })}
        />
      )}
      {/* 나의 새 모달 */}
      {isMyBirdOpen.isModal && (
        <ModalBlackBg
          modal={<MyBird />}
          closeModal={() => setIsMyBirdOpen({ isModal: false })}
        />
      )}
      {/* 새로운 새 모달 */}
      {isNewBirdOpen.isModal && (
        <ModalBlackBg
          modal={<NewBird />}
          closeModal={() =>
            setIsNewBirdOpen({ ...isNewBirdOpen, isModal: false })
          }
        />
      )}
      {/* 추억 작성 모달 */}
      {isCreate.isModal && (
        <ModalBlackBg
          closeModal={() => {
            setIsCreate({ ...isCreate, isModal: false });
          }}
          modal={<CreateBoox />}
        />
      )}

      {/* 추억 조회 모달 */}
      {isMyTreeOpen.isModal && (
        <ModalBlackBg
          modal={<MemoryView boardId={isMyTreeOpen.boardId} />}
          closeModal={() =>
            setIsMyTreeOpen({ ...isMyTreeOpen, isModal: false })
          }
        />
      )}
    </div>
  );
}
